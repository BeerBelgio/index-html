(() => {
 'use strict';
 const $=id=>document.getElementById(id),qa=IndexFXQA,b=IndexFXBench;
 if(!['127.0.0.1','localhost','[::1]'].includes(location.hostname)){$('restricted').hidden=false;return;}
 $('app').hidden=false;
 let catalogue,report,busy=false,stop=false,pilotKey='';
 const cfg=()=>{const [width,height]=$('resolution').value.split('x').map(Number);return {width,height,source:$('source').value,fps:Number($('fps').value),durationSeconds:Number($('duration').value),temporalSeconds:3};};
 const key=()=>{const {source,fps,durationSeconds}=cfg();return JSON.stringify({source,fps,durationSeconds});};
 const fmt=n=>Number.isFinite(n)?n.toFixed(2):'—';
 function buttons(){
  for(const id of ['pilot','single'])$(id).disabled=busy||!catalogue;
  $('matrix').disabled=busy||!catalogue||pilotKey!==key();$('stop').disabled=!busy;
  for(const id of ['json','csv'])$(id).disabled=busy||!report;
  for(const id of ['module','source','resolution','fps','duration'])$(id).disabled=busy;
 }
 function row(r){
  const tr=document.createElement('tr');
  const vals=[r.kind,r.name,r.actual?r.actual.width+'×'+r.actual.height:r.requested.width+'×'+r.requested.height,r.status,fmt(r.cadence?.completedPipelineFps),r.cadence?.missedSlots??'—',fmt(r.pipelineMs?.p95),fmt(r.gpuCompositeMs?.p95),r.records?.length??'—'];
  vals.forEach((v,i)=>{const td=document.createElement('td');td.textContent=v;if(i===3)td.className=r.status;tr.append(td);});$('rows').append(tr);
 }
 function evidence(r){
  const last=r.records?.at(-1);if(last){$('dry-img').src=last.dryPreview;$('wet-img').src=last.wetPreview;}
  $('environment').textContent=r.environment?.renderer||$('environment').textContent;
  $('details').textContent=JSON.stringify({...r,preview:r.preview?'embedded PNG':undefined,records:r.records?.map(({dryPreview,wetPreview,...rest})=>rest)},null,2);
 }
 async function execute(mode){
  if(busy||!catalogue||(mode==='matrix'&&pilotKey!==key()))return;
  busy=true;stop=false;const config=cfg(),ids=mode==='pilot'?qa.PILOT:mode==='matrix'?catalogue.tools.map(t=>t.toolId):[$('module').value];
  if(mode==='pilot')pilotKey='';
  const planned=b.jobs(catalogue,ids,mode==='matrix'?b.RESOLUTIONS:[[config.width,config.height]]);
  report={schemaVersion:2,labVersion:b.VERSION,baseline:qa.BASELINE,upstream:catalogue.project.sourceCommit,startedAt:new Date().toISOString(),mode,config,plan:planned,results:[],scope:'Local benchmark screening. Completed browser pipeline frames, not monitor presentation; GPU queries include compositor. Temporal tests are sampled comparisons, not OpenMosh parity.'};
  $('rows').replaceChildren();$('dry-img').removeAttribute('src');$('wet-img').removeAttribute('src');$('progress').max=planned.length;$('progress').value=0;buttons();
  try{
   for(const job of planned){
    const tool=job.id==='dry'?null:catalogue.tools.find(t=>t.toolId===job.id),name=tool?.name||'DRY / no FX';
    let result;
    if(stop||document.hidden)result={id:job.id,name,status:'NOT_RUN',requested:{width:job.width,height:job.height},error:'Stopped or hidden tab'};
    else{
     $('status').textContent=job.kind+' · '+name+' · '+job.width+'×'+job.height+' · '+(report.results.length+1)+'/'+planned.length;
     const hooks={surface:$('screen'),legacy:$('legacy'),end:$('end'),stop:()=>stop};
     const settings={...config,width:job.width,height:job.height};
     result=await (job.kind==='benchmark'?b.benchmark(tool,settings,hooks):b.temporal(tool,settings,hooks));
     if(result.status!=='PASS'&&(mode==='pilot'||job.id==='dry'))stop=true;
     evidence(result);
    }
    const record={kind:job.kind,...result};report.results.push(record);row(record);$('progress').value=report.results.length;
   }
   const passed=report.results.filter(r=>r.status==='PASS').length;
   if(mode==='pilot'&&passed===planned.length)pilotKey=key();
   $('status').textContent=passed+'/'+planned.length+' completed · export report. Performance target and visual interpretation remain separate.';
  }catch(e){report.error=e.message;$('status').textContent='Run error: '+e.message;}
  finally{
   for(const job of planned.slice(report.results.length)){const r={kind:job.kind,id:job.id,name:catalogue.tools.find(t=>t.toolId===job.id)?.name||'DRY / no FX',requested:{width:job.width,height:job.height},status:'NOT_RUN',error:'Earlier infrastructure error'};report.results.push(r);row(r);}
   report.finishedAt=new Date().toISOString();busy=false;buttons();
  }
 }
 function download(ext,content,type){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download='INDEX-FX-QA02-'+report.mode+'-'+report.startedAt.replace(/[:.]/g,'-')+'.'+ext;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
 for(const id of ['pilot','single','matrix'])$(id).onclick=()=>execute(id);
 $('stop').onclick=()=>{stop=true;$('status').textContent='Stopping…';};
 $('json').onclick=()=>download('json',JSON.stringify(report,null,2),'application/json');$('csv').onclick=()=>download('csv',b.csv(report),'text/csv');
 for(const id of ['source','resolution','fps','duration'])$(id).onchange=buttons;
 qa.catalogue().then(data=>{catalogue=data;for(const t of data.tools){const o=document.createElement('option');o.value=t.toolId;o.textContent=t.name+' · '+t.version;$('module').append(o);}$('module').value='openmosh-grain';$('status').textContent='Ready — run pilot first.';buttons();}).catch(e=>{$('status').textContent=e.message;});
})();