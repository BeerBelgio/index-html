(() => {
 'use strict';
 const $=id=>document.getElementById(id),qa=IndexFXQA;
 if(!['127.0.0.1','localhost','[::1]'].includes(location.hostname)){$('restricted').hidden=false;return;}
 $('app').hidden=false;
 let catalogue,report,busy=false,stop=false,pilotKey='';
 const config=()=>{const [width,height]=$('resolution').value.split('x').map(Number);return {width,height,fps:Number($('fps').value),source:$('input').value,full:true};};
 const key=()=>JSON.stringify(config());
 function buttons(){for(const id of ['pilot','single'])$(id).disabled=busy||!catalogue;$('all').disabled=busy||pilotKey!==key();$('stop').disabled=!busy;for(const id of ['json','csv'])$(id).disabled=busy||!report;for(const id of ['module','input','resolution','fps'])$(id).disabled=busy;}
 function render(){
  $('rows').replaceChildren();for(const r of report.results){const tr=document.createElement('tr');const values=[r.name,r.status,r.cases.filter(c=>c.status==='PASS').length+'/'+(r.plannedCases??'—'),r.passes??'—',r.history??'—',r.cpuRenderMs?.p95?.toFixed(2)??'—',r.gpuCompositeMs?.p95?.toFixed(2)??'—',r.textureBytesEstimate==null?'—':(r.textureBytesEstimate/1048576).toFixed(1)+' MiB'];values.forEach((v,i)=>{const td=document.createElement('td');td.textContent=v;if(i===1)td.className=r.status;tr.append(td);});$('rows').append(tr);}
 }
 async function execute(mode){
  if(busy)return;busy=true;stop=false;const cfg=config(),ids=mode==='pilot'?qa.PILOT:mode==='all'?catalogue.tools.map(t=>t.toolId):[$('module').value];
  if(mode==='pilot')pilotKey='';
  report={schemaVersion:1,labVersion:'QA-01A.1',baseline:qa.BASELINE,upstream:catalogue.project.sourceCommit,startedAt:new Date().toISOString(),mode,config:cfg,results:[],scope:'Technical integration smoke; artistic/reference QA and full native benchmark not performed.'};
  $('progress').max=ids.length;$('progress').value=0;render();buttons();
  try{
   for(const id of ids){
    const t=catalogue.tools.find(x=>x.toolId===id);
    if(stop||document.hidden){report.results.push({id:t.toolId,name:t.name,version:t.version,status:'NOT_RUN',cases:[],observations:[],error:'Stopped or tab hidden'});continue;}
    $('qa-still').hidden=true;$('frame-label').textContent='Testing '+t.name+' · live test';
    $('status').textContent='Testing '+t.name+'…';
    const result=await qa.run(t,cfg,{surface:$('screen'),legacy:$('qa-legacy'),end:$('qa-end'),stop:()=>stop,caseDone:(c,r)=>{$('details').textContent=t.name+' · '+r.cases.length+'/'+r.plannedCases+' · '+c.name;}});
    report.results.push(result);$('progress').value=report.results.length;render();
    if(result.defaultPreview){$('qa-still').src=result.defaultPreview;$('qa-still').hidden=false;$('frame-label').textContent=t.name+' · captured default-state frame';}
    $('environment').textContent=result.environment?.renderer||'GPU not available';
    $('details').textContent=JSON.stringify({...result,defaultPreview:result.defaultPreview?'embedded PNG':undefined},null,2);
    // Abort the pilot after any failure. A full-library run stops on infrastructure block.
    if((mode==='pilot'&&result.status!=='PASS')||result.status==='BLOCKED')stop=true;
   }
   if(mode==='pilot'&&report.results.length===4&&report.results.every(r=>r.status==='PASS'))pilotKey=key();
   $('status').textContent=report.results.map(r=>r.status).reduce((a,s)=>(a[s]=(a[s]||0)+1,a),{}).PASS===ids.length?'Technical checks passed. Visual/reference review remains open.':'Run ended — inspect statuses before proceeding.';
  }catch(e){report.error=e.message;$('status').textContent='Run error: '+e.message;}
  finally{report.finishedAt=new Date().toISOString();busy=false;buttons();render();}
 }
 function download(ext,content,type){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download='INDEX-FX-QA-'+report.mode+'-'+report.startedAt.replace(/[:.]/g,'-')+'.'+ext;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
 $('pilot').onclick=()=>execute('pilot');$('single').onclick=()=>execute('single');$('all').onclick=()=>execute('all');$('stop').onclick=()=>{stop=true;$('status').textContent='Stopping at next frame…';};$('json').onclick=()=>download('json',JSON.stringify(report,null,2),'application/json');$('csv').onclick=()=>download('csv',qa.csv(report),'text/csv');for(const id of ['input','resolution','fps'])$(id).onchange=buttons;
 qa.catalogue().then(data=>{catalogue=data;for(const t of data.tools){const o=document.createElement('option');o.value=t.toolId;o.textContent=t.name+' · '+t.version;$('module').append(o);}$('module').value='openmosh-grain';$('status').textContent='Ready — run pilot first.';buttons();}).catch(e=>{$('status').textContent=e.message;});
})();