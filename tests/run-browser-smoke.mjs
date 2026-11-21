#!/usr/bin/env node
// Real-clock Chromium DevTools browser check; avoids --virtual-time-budget races.
// Local HTTP fixtures only. No external network URLs, no new dependencies.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawn} from 'node:child_process';
const [url,outFile,browser='chromium']=process.argv.slice(2);
if(!url||!outFile||!/^http:\/\/127\.0\.0\.1:\d+\/tests\/[\w.-]+\.html$/.test(url))
  throw Error('Usage: run-browser-smoke.mjs LOCAL_FIXTURE_URL result.html [chromium]');
const sleep=ms=>new Promise(done=>setTimeout(done,ms));
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'index-cdp-'));
const logFile=path.join(temp,'stderr.log'),fd=fs.openSync(logFile,'w');
const chrome=spawn(browser,[
  '--headless=new','--no-sandbox','--disable-dev-shm-usage',
  '--disable-gpu-sandbox','--use-gl=angle','--use-angle=swiftshader',
  '--enable-unsafe-swiftshader','--disable-background-timer-throttling',
  '--disable-renderer-backgrounding','--disable-backgrounding-occluded-windows',
  '--remote-debugging-port=0','--remote-allow-origins=*',
  '--user-data-dir='+temp,'about:blank'
],{stdio:['ignore','ignore',fd]});
fs.closeSync(fd);
const until=Date.now()+55000;
let ws;
async function devtoolsPort(){
  const file=path.join(temp,'DevToolsActivePort');
  while(Date.now()<until){
    if(chrome.exitCode!==null)throw Error('Chrome exited: '+chrome.exitCode);
    if(fs.existsSync(file)){
      const n=Number(fs.readFileSync(file,'utf8').split('\n')[0]);
      if(Number.isInteger(n)&&n>0)return n;
    }
    await sleep(100);
  }
  throw Error('Chrome DevTools port unavailable');
}
async function pageTab(port){
  while(Date.now()<until){
    try{
      const tabs=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
      const page=tabs.find(t=>t.type==='page'&&t.webSocketDebuggerUrl);
      if(page)return page;
    }catch{}
    await sleep(100);
  }
  throw Error('Chrome page target unavailable');
}
async function connect(address){
  ws=new WebSocket(address);
  await new Promise((resolve,reject)=>{
    const timeout=setTimeout(()=>reject(Error('CDP WebSocket timeout')),5000);
    ws.addEventListener('open',()=>{clearTimeout(timeout);resolve()},{once:true});
    ws.addEventListener('error',()=>{clearTimeout(timeout);reject(Error('CDP WebSocket connection failed'))},{once:true});
  });
  let seq=0;
  const pending=new Map();
  ws.addEventListener('message',event=>{
    let msg;
    try{msg=JSON.parse(event.data)}catch{return}
    if(!msg.id)return;
    const task=pending.get(msg.id);
    if(!task)return;
    pending.delete(msg.id);clearTimeout(task.timeout);
    if(msg.error)task.reject(Error('CDP '+msg.error.message));
    else task.resolve(msg.result);
  });
  return (method,params={})=>new Promise((resolve,reject)=>{
    const id=++seq;
    const timeout=setTimeout(()=>{pending.delete(id);reject(Error('CDP '+method+' timeout'))},5000);
    pending.set(id,{resolve,reject,timeout});
    ws.send(JSON.stringify({id,method,params}));
  });
}
async function evaluate(send,expression){
  const r=await send('Runtime.evaluate',{expression,returnByValue:true});
  if(r.exceptionDetails)throw Error('CDP browser evaluation error');
  return r.result?.value;
}
let outcome='PENDING';
try{
  const port=await devtoolsPort(),tab=await pageTab(port),send=await connect(tab.webSocketDebuggerUrl);
  await send('Page.enable');await send('Runtime.enable');
  await send('Page.navigate',{url});
  const expression="(()=>{const el=document.querySelector('#results');return {status:el?.dataset.result||'PENDING',text:el?.textContent||'',html:document.documentElement.outerHTML};})()";
  while(Date.now()<until){
    const state=await evaluate(send,expression);
    if(state&&(state.status==='PASS'||state.status==='FAIL')){
      outcome=state.status;
      fs.writeFileSync(outFile,'<!doctype html>\n'+state.html+'\n');
      process.stdout.write(state.text+'\n');
      break;
    }
    await sleep(200);
  }
  if(outcome==='PENDING')throw Error('Browser smoke timed out with no result');
  if(outcome!=='PASS')throw Error('Browser smoke FAIL');
}catch(e){
  process.stderr.write(String(e)+'\nChrome stderr tail:\n'+fs.readFileSync(logFile,'utf8').slice(-2200)+'\n');
  process.exitCode=1;
}finally{
  try{ws?.close()}catch{}
  try{chrome.kill('SIGTERM')}catch{}
}
