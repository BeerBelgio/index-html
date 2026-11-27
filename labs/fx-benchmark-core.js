/* QA-02 only. Keep the production compositor unchanged. */
(() => {
 'use strict';
 const qa=IndexFXQA;
 const RESOLUTIONS=[[320,180],[640,360],[1280,720],[1920,1080],[3840,2160]];
 const VERSION='QA-02.1';
 const assert=(v,m)=>{if(!v)throw Error(m);};
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const stopped=h=>h.stop?.()||document.hidden;
 const ensure=h=>{if(stopped(h))throw Error('STOPPED');};
 const actualSize=(w,h)=>{const s=Math.min(1,2048/Math.max(w,h));return {width:Math.max(1,Math.round(w*s)),height:Math.max(1,Math.round(h*s))};};
 function nextRAF(h){
  ensure(h);
  return new Promise((resolve,reject)=>{
   let raf=0,timer=0;
   const finish=(error,value)=>{cancelAnimationFrame(raf);clearTimeout(timer);error?reject(error):resolve(value);};
   raf=requestAnimationFrame(ts=>finish(stopped(h)?Error('STOPPED'):null,ts));
   timer=setTimeout(()=>finish(Error(stopped(h)?'STOPPED':'RAF_TIMEOUT')),2500);
  });
 }
 // Wall-clock schedule: one frame at most per due slot, never catch up by rendering bursts.
 function slotAt(elapsedMs,fps){return Math.max(0,Math.floor((elapsedMs+.5)*fps/1000));}
 function cadence(targetSlots,completedInWindow,late,elapsedMs,fps){
  return {targetFps:fps,targetSlots,completedInWindow,missedSlots:Math.max(0,targetSlots-completedInWindow),
   lateCompletions:late,windowMs:elapsedMs,completedPipelineFps:completedInWindow*1000/elapsedMs};
 }
 function thumbnail(canvas){
  const c=document.createElement('canvas');c.width=320;c.height=Math.round(320*canvas.height/canvas.width);
  c.getContext('2d').drawImage(canvas,0,0,c.width,c.height);return c.toDataURL('image/png');
 }
 function comparePixels(a,b){
  assert(a.length===b.length,'Readback size mismatch');let sum=0,changed=0;
  for(let i=0;i<a.length;i+=4){let delta=0;for(let j=0;j<4;j++)delta+=Math.abs(a[i+j]-b[i+j]);sum+=delta;if(delta>0)changed++;}
  return {meanAbsoluteRGBA:sum/a.length,changedPixelFraction:changed/(a.length/4)};
 }
 function activation(m){
  const defaults=IndexFXPreview.defaults(m),state={...defaults},changed=[];
  // Explicit heuristic for temporal/amount controls; not a claim of exhaustive state coverage.
  for(const p of m.params){
   if(!/^(speed|rate|chance|probability|frequency|amount|intensity|strength|magnitude|amplitude|flow|cycle|spin|level|decay|corruption)$/i.test(p.key))continue;
   if(IndexNumericControls.kind(p)!=='slider')continue;
   if(Number(p.max)!==Number(p.default)){state[p.key]=Number(p.max);changed.push(p.key);}
  }
  return changed.length?{name:'activation-max',state,changed}:null;
 }
 async function session(tool,cfg,hooks,body){
  let engine,gl,src,fx,canvas,timer;const size=actualSize(cfg.width,cfg.height);
  let diagnostic='',frameId=0;
  try{
   ensure(hooks);
   const loaded=tool?await qa.load(tool):null,m=loaded?.manifest;
   src=await qa.source(cfg.source,size.width,size.height);
   engine=IndexWebGL2Lab.create({surface:hooks.surface,legacyCanvas:hooks.legacy,emptyElement:hooks.end,onDiagnostic:(_,message)=>{diagnostic=message;}});
   canvas=hooks.surface.querySelector('#pg-gpu-lab');assert(canvas,'WebGL2 canvas unavailable');gl=canvas.getContext('webgl2');
   const gen={role:'generator',manifest:{},visible:true,opacity:1,blend:'normal'},layer=m?{role:'effect-webgl2',manifest:m,visible:true,opacity:1,blend:'normal',alpha:{}}:null;
   const defaults=m?IndexFXPreview.defaults(m):{};
   function render(bitmap,state,time,withFX,running=true,measure=false){
    gen.bitmap=bitmap;if(layer)layer.state=state;
    let q=null,begin=performance.now(),ok;
    if(measure)q=timer?.begin();
    begin=performance.now();
    try{ok=engine.render(withFX&&layer?[gen,layer]:[gen],cfg.width,cfg.height,{running,time,frameId:++frameId});}
    finally{if(measure)timer?.end(q);gen.bitmap=null;}
    assert(ok&&!diagnostic&&!gl.isContextLost()&&!fx?.stats().error,diagnostic||fx?.stats().error||'Render failed');
    return performance.now()-begin;
   }
   async function draw(state,frame,time,withFX,running=true,measure=false){
    ensure(hooks);const start=performance.now(),bitmap=await src.bitmap(frame,time),sourceMs=performance.now()-start;
    try{ensure(hooks);const renderMs=render(bitmap,state,time,withFX,running,measure);return {sourceMs,renderMs,pipelineMs:performance.now()-start};}
    finally{bitmap.close();}
   }
   await draw(defaults,0,0,false,false);
   const actual={width:canvas.width,height:canvas.height};assert(actual.width===size.width&&actual.height===size.height,'Unexpected target size');
   const dryBytes=engine.getStats().textureBytesEstimate;
   if(m){const t=performance.now();fx=engine.createFX('qa02-effect',m.effect);layer.fx=fx;loaded.compileAllocateCpuMs=performance.now()-t;}
   const metadata={id:tool?.toolId||'dry',name:tool?.name||'DRY / no FX',version:tool?.version||null,exportSha256:loaded?.sha256||null,
    requested:{width:cfg.width,height:cfg.height},actual,source:cfg.source,passes:m?.effect.passes.length||0,history:!!m?.effect.history,
    environment:qa.environment(gl),textureBytesEstimate:engine.getStats().textureBytesEstimate,fxTextureBytesEstimate:engine.getStats().textureBytesEstimate-dryBytes,
    compileAllocateCpuMs:loaded?.compileAllocateCpuMs??null};
   const result=await body({draw,render,src,gl,canvas,fx,m,defaults,metadata,startTimer(){timer?.dispose();timer=qa.gpuTimer(gl);return timer;}});
   if(fx){fx.dispose();fx=null;assert(engine.getStats().textureBytesEstimate===dryBytes,'FX texture estimate did not return to baseline');}
   return {...metadata,...result,cleanup:'PASS'};
  }finally{timer?.dispose();fx?.dispose();engine?.dispose();gl?.getExtension('WEBGL_lose_context')?.loseContext();src?.dispose();}
 }
 async function benchmark(tool,cfg,hooks){
  const meta={id:tool?.toolId||'dry',name:tool?.name||'DRY / no FX',requested:{width:cfg.width,height:cfg.height},source:cfg.source,targetFps:cfg.fps};
  try{return await session(tool,cfg,hooks,async s=>{
   const withFX=!!tool,period=1000/cfg.fps,targetSlots=Math.round(cfg.durationSeconds*cfg.fps),windowMs=targetSlots*period;
   for(let f=0;f<8;f++)await s.draw(s.defaults,f,f/cfg.fps,withFX);
   s.fx?.resetHistory();
   const timer=s.startTimer(),source=[],render=[],pipeline=[],intervals=[];let lastSlot=-1,lastRAF=null,completed=0,late=0,attempted=0,overrun=0;
   // Anchor to the first rAF, then schedule by real elapsed time, not loop iterations.
   let stamp=await nextRAF(hooks);const start=performance.now(),attemptedSlots=[];
   while(true){
    const elapsed=performance.now()-start;
    if(lastRAF!==null)intervals.push(stamp-lastRAF);lastRAF=stamp;
    if(elapsed>=windowMs)break;
    const slot=slotAt(elapsed,cfg.fps);
    if(slot>lastSlot&&slot<targetSlots){
     lastSlot=slot;attempted++;attemptedSlots.push(slot);
     const timings=await s.draw(s.defaults,slot,slot/cfg.fps,withFX,true,true);
     const end=performance.now()-start;
     source.push(timings.sourceMs);render.push(timings.renderMs);pipeline.push(timings.pipelineMs);
     if(end<=windowMs)completed++;else overrun++;
     if(end>(slot+1)*period)late++;
     if(end>=windowMs)break;
    }
    stamp=await nextRAF(hooks);
   }
   const elapsedMs=performance.now()-start,gpu=await timer.finish();
   assert(attempted>0,'No measured pipeline frames');
   // A GPU timing query measures submitted compositor commands (upload/FX/composite), not source production.
   return {status:'PASS',measurement:'wall-clock rAF gated; completed JS pipeline, not monitor presentation',
    cadence:{...cadence(targetSlots,completed,late,windowMs,cfg.fps),attempted,attemptedSlots,overrun,observedElapsedMs:elapsedMs,rafIntervalMs:qa.summary(intervals)},
    sourceMs:qa.summary(source),rendererCpuMs:qa.summary(render),pipelineMs:qa.summary(pipeline),gpuCompositeMs:gpu,
    state:s.defaults,preview:thumbnail(s.canvas)};
  });}catch(e){return {...meta,status:e.message==='STOPPED'?'NOT_RUN':'FAIL',error:String(e.message||e)};}
 }
 async function temporal(tool,cfg,hooks){
  const tc={width:640,height:360,fps:cfg.fps,source:tool.effect?.history?'moving':'chart'},duration=cfg.temporalSeconds??3;
  const meta={id:tool.toolId,name:tool.name,requested:{width:tc.width,height:tc.height},source:tc.source};
  const records=[];
  try{return await session(tool,tc,hooks,async s=>{
   const states=[{name:'defaults',state:s.defaults,changed:[]}],extra=activation(s.m);if(extra)states.push(extra);
   const end=Math.round(duration*tc.fps),targets=new Set([0,Math.round(end/6),Math.round(end/3),Math.round(end*2/3),end]);
   for(const item of states){
    s.fx.resetHistory();const samples=[];let dryPreview,wetPreview;
    for(let frame=0;frame<=end;frame++){
     ensure(hooks);const time=frame/tc.fps,bitmap=await s.src.bitmap(frame,time);
     try{
      ensure(hooks);let dry;
      if(targets.has(frame)){
       s.render(bitmap,item.state,time,false,false);
       dry=qa.sample(s.gl,s.canvas.width,s.canvas.height);
       if(frame===end)dryPreview=thumbnail(s.canvas);
      }
      s.render(bitmap,item.state,time,true,true);
      if(dry){
       const wet=qa.sample(s.gl,s.canvas.width,s.canvas.height);
       samples.push({frame,time,drySha256:await qa.sha(dry.pixels),wetSha256:await qa.sha(wet.pixels),...comparePixels(dry.pixels,wet.pixels),wetStats:wet.stats});
       if(frame===end)wetPreview=thumbnail(s.canvas);
      }
     }finally{bitmap.close();}
     if(frame%12===0)await sleep(0);
    }
    assert(s.fx.stats().frame===end+1,'Temporal frame count mismatch');
    records.push({...item,status:'PASS',frames:end+1,samples,dryPreview,wetPreview,
     observation:samples.every(x=>x.changedPixelFraction===0)?'NO_VISIBLE_DELTA_AT_SAMPLED_FRAMES':'VISIBLE_DELTA_AT_SAMPLED_FRAMES'});
   }
   return {status:'PASS',durationSeconds:duration,records,artisticReview:'NOT_RUN',referenceComparison:'NOT_RUN'};
  });}catch(e){return {...meta,status:e.message==='STOPPED'?'NOT_RUN':'FAIL',error:String(e.message||e),records};}
 }
 function jobs(catalogue,ids,resolutions){
  return resolutions.flatMap(([width,height])=>[{kind:'benchmark',id:'dry',width,height},...ids.map(id=>({kind:'benchmark',id,width,height}))])
   .concat(ids.map(id=>({kind:'temporal',id,width:640,height:360})));
 }
 function csv(report){
  const header=['kind','id','name','status','requestedWidth','requestedHeight','actualWidth','actualHeight','source','targetFps','targetSlots','completedInWindow','missedSlots','lateCompletions','pipelineFps','sourceP95Ms','rendererP95Ms','pipelineP95Ms','gpuP95Ms','gpuStatus','gpuSamples','textureBytesEstimate','fxTextureBytesEstimate','temporalStates','visibleDeltaStates','error'];
  const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  const rows=report.results.map(r=>[r.kind,r.id,r.name,r.status,r.requested?.width,r.requested?.height,r.actual?.width,r.actual?.height,r.source,r.cadence?.targetFps,r.cadence?.targetSlots,r.cadence?.completedInWindow,r.cadence?.missedSlots,r.cadence?.lateCompletions,r.cadence?.completedPipelineFps,r.sourceMs?.p95,r.rendererCpuMs?.p95,r.pipelineMs?.p95,r.gpuCompositeMs?.p95,r.gpuCompositeMs?.status,r.gpuCompositeMs?.count,r.textureBytesEstimate,r.fxTextureBytesEstimate,r.records?.length,r.records?.filter(s=>s.observation==='VISIBLE_DELTA_AT_SAMPLED_FRAMES').length,r.error]);
  return [header.join(','),...rows.map(row=>row.map(quote).join(','))].join('\r\n')+'\r\n';
 }
 window.IndexFXBench={VERSION,RESOLUTIONS,actualSize,slotAt,cadence,comparePixels,activation,benchmark,temporal,jobs,csv};
})();