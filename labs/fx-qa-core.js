/* QA-only adapter; never changes the production compositor or exports. */
(() => {
 'use strict';
 const BASELINE='f38c4372c26530657b2ef92172f8b296b50b8452';
 const PILOT=['openmosh-grain','openmosh-feedback','openmosh-blur','openmosh-mirror'];
 const yieldFrame=()=>new Promise(resolve=>setTimeout(resolve,0));
 const sha=async data=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data)),b=>b.toString(16).padStart(2,'0')).join('');
 const assert=(ok,message)=>{if(!ok)throw Error(message);};
 const summary=values=>{
  const a=values.filter(Number.isFinite).sort((a,b)=>a-b);
  const q=p=>a.length?a[Math.max(0,Math.ceil(a.length*p)-1)]:null;
  return {count:a.length,p50:q(.5),p95:q(.95),p99:q(.99)};
 };
 async function catalogue(){
  const response=await fetch('data/fx.json',{cache:'no-store'});
  if(!response.ok)throw Error('Catalogue HTTP '+response.status);
  const data=await response.json();
  assert(Array.isArray(data.tools)&&data.tools.length===38,'Expected 38 FX');
  return data;
 }
 async function load(tool){
  const res=await fetch(tool.file,{cache:'no-store'});
  if(!res.ok)throw Error('Export HTTP '+res.status);
  const bytes=await res.arrayBuffer(),html=new TextDecoder().decode(bytes);
  const match=html.match(/window\.INDEX_TOOL\s*=\s*(\{[\s\S]*?\n\});/);
  assert(match,'JSON manifest not found');
  const m=JSON.parse(match[1]),a=IndexImportPreflight.assess(m,{native:true,nativeControls:true});
  assert(a.status!=='UNSUPPORTED',a.reason);
  assert(a.role==='effect-webgl2'&&m.effect.moduleId===tool.toolId&&m.effect.moduleVersion===tool.version,'Catalogue identity mismatch');
  return {manifest:m,sha256:await sha(bytes),assessment:a};
 }
 function plan(m,full=true){
  const defaults=IndexFXPreview.defaults(m),cases=[{name:'defaults',state:{...defaults}}];
  if(!full)return cases;
  for(const p of m.params){
   const kind=IndexNumericControls.kind(p);
   const values=kind==='toggle'?[0,1]:kind==='choice'?p.options.map(o=>Number(typeof o==='object'?o.value:o)):[Number(p.min),Number(p.max)];
   for(const v of [...new Set(values)])cases.push({name:p.key+'='+v,state:{...defaults,[p.key]:v}});
  }
  for(const c of m.colors)for(const v of ['#ff3377','#23c9e8'])cases.push({name:c.key+'='+v,state:{...defaults,[c.key]:v}});
  return cases;
 }
 function chart(ctx,w,h,frame,moving){
  ctx.fillStyle='#19232c';ctx.fillRect(0,0,w,h);
  const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#24365c');g.addColorStop(.55,'#dcd3af');g.addColorStop(1,'#476a79');
  ctx.fillStyle=g;ctx.fillRect(w*.17,h*.17,w*.66,h*.66);
  const a=Math.round(w*.12),b=Math.round(h*.16);
  for(const [x,y,c] of [[0,0,'#ff0000'],[w-a,0,'#00ff00'],[0,h-b,'#0000ff'],[w-a,h-b,'#ffff00']]){ctx.fillStyle=c;ctx.fillRect(x,y,a,b);}
  ctx.strokeStyle='#101010';ctx.lineWidth=Math.max(1,w/180);
  for(let i=1;i<8;i++){ctx.beginPath();ctx.moveTo(w*i/8,h*.26);ctx.lineTo(w*i/8,h*.72);ctx.stroke();}
  const x=moving?w*(.50+.25*Math.sin(frame*.19)):w*.39;
  const y=moving?h*(.5+.18*Math.cos(frame*.13)):h*.56;
  ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(x,y,h*.11,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#d93887';ctx.fillRect(w*.25,h*.23,w*.085,h*.17);
  ctx.fillStyle='#141414';ctx.font='bold '+Math.round(h*.13)+'px sans-serif';ctx.fillText('INDEX',w*.29,h*.84);
 }
 async function source(kind,w,h){
  const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d');
  let img,iframe,gen,genCanvas,genState;
  if(kind==='favicon'){
   img=new Image();img.src='assets/branding/favicon.svg';await img.decode();
  }
  if(kind==='generator'){
   const res=await fetch('data/tools.json');const data=await res.json();const tool=data.tools.find(t=>t.slug==='linking-nodes');
   assert(tool,'Linking Nodes missing');
   iframe=document.createElement('iframe');iframe.style.cssText='position:fixed;left:-10000px;top:0;width:320px;height:180px';iframe.src=tool.file+'?catalogue=1';
   try{
    await new Promise((ok,bad)=>{const timeout=setTimeout(()=>bad(Error('Generator load timeout')),8000);iframe.onload=()=>{clearTimeout(timeout);ok();};iframe.onerror=()=>{clearTimeout(timeout);bad(Error('Generator load error'));};document.body.append(iframe);});
    gen=iframe.contentWindow;const m=gen.INDEX_TOOL||gen.SKETCH_TOOL;assert(m,'Generator manifest unavailable');genState=IndexFXPreview.defaults(m);genCanvas=iframe.contentDocument.querySelector('#sketch-canvas')||iframe.contentDocument.querySelector('canvas');assert(genCanvas,'Generator canvas unavailable');(gen.indexResize||gen.sketchResize)(w,h);
   }catch(e){iframe.remove();throw e;}
  }
  return {async bitmap(frame,time){
   if(kind==='favicon'){ctx.fillStyle='#f6f2e7';ctx.fillRect(0,0,w,h);const size=Math.min(w,h)*.83;ctx.drawImage(img,(w-size)*.43,(h-size)*.46,size,size);}
   else if(kind==='generator'){genState.time=time;await(gen.indexDraw||gen.sketchDraw)(genState);ctx.clearRect(0,0,w,h);ctx.drawImage(genCanvas,0,0,w,h);}
   else chart(ctx,w,h,frame,kind==='moving');
   return createImageBitmap(c);
  },dispose(){iframe?.remove();}};
 }
 function sample(gl,w,h){
  const pixels=new Uint8Array(w*h*4);gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
  assert(gl.getError()===gl.NO_ERROR,'Pixel readback failed');
  let sum=0,square=0,opaque=0,nonzero=0;
  for(let i=0;i<pixels.length;i+=4){const l=(pixels[i]+pixels[i+1]+pixels[i+2])/3;sum+=l;square+=l*l;if(pixels[i+3])nonzero++;if(pixels[i+3]===255)opaque++;}
  const n=w*h,mean=sum/n;
  const at=(x,y)=>Array.from(pixels.slice(4*(y*w+x),4*(y*w+x)+4));
  return {pixels,stats:{mean,variance:Math.max(0,square/n-mean*mean),nonzeroAlpha:nonzero/n,opaque:opaque/n,corners:[at(2,h-3),at(w-3,h-3),at(2,2),at(w-3,2)]}};
 }
 function gpuTimer(gl){
  const ext=gl.getExtension('EXT_disjoint_timer_query_webgl2'),pending=[],values=[];let discarded=0,issued=0;
  function collect(){
   if(!ext)return;
   if(gl.getParameter(ext.GPU_DISJOINT_EXT)){discarded+=pending.length+values.length;for(const q of pending)gl.deleteQuery(q);pending.length=0;values.length=0;return;}
   for(let i=pending.length-1;i>=0;i--){const q=pending[i];if(gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE)){values.push(gl.getQueryParameter(q,gl.QUERY_RESULT)/1e6);gl.deleteQuery(q);pending.splice(i,1);}}
  }
  return {begin(){if(!ext)return null;collect();if(pending.length>=8)return null;const q=gl.createQuery();if(!q)return null;gl.beginQuery(ext.TIME_ELAPSED_EXT,q);issued++;return q;},end(q){if(q){gl.endQuery(ext.TIME_ELAPSED_EXT);pending.push(q);}},async finish(){
   if(!ext)return {status:'NOT_AVAILABLE',...summary([]),issued:0,discarded:0};
   const end=performance.now()+800;
   while(pending.length&&performance.now()<end){collect();if(pending.length)await new Promise(r=>setTimeout(r,10));}
   collect();const unresolved=pending.length;for(const q of pending)gl.deleteQuery(q);pending.length=0;
   return {status:values.length?'SAMPLED':'INCONCLUSIVE',...summary(values),issued,discarded,unresolved};
  },dispose(){for(const q of pending)gl.deleteQuery(q);pending.length=0;}};
 }
 function environment(gl){
  const ext=gl.getExtension('WEBGL_debug_renderer_info');
  return {userAgent:navigator.userAgent,platform:navigator.platform,renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),vendor:ext?gl.getParameter(ext.UNMASKED_VENDOR_WEBGL):gl.getParameter(gl.VENDOR),webglVersion:gl.getParameter(gl.VERSION),timerQuery:!!gl.getExtension('EXT_disjoint_timer_query_webgl2')};
 }
 async function run(tool,config,hooks={}){
  const result={id:tool.toolId,name:tool.name,version:tool.version,status:'NOT_RUN',cases:[],observations:[],referenceComparison:'NOT_RUN',artisticReview:'NOT_RUN',requested:{width:config.width,height:config.height,fps:config.fps,source:config.source}};
  let engine,gl,src,fx,timer,canvas,planned=[];
  const stopped=()=>hooks.stop?.()||document.hidden;
  try{
   assert(!stopped(),'STOPPED');
   const {manifest:m,sha256,assessment}=await load(tool);
   result.exportSha256=sha256;result.preflight=assessment.status;result.passes=m.effect.passes.length;result.history=m.effect.history;result.parameters=m.params;result.colors=m.colors;result.provenance=m.effect.provenance;
   const scale=Math.min(1,2048/Math.max(config.width,config.height));
   const w=Math.max(1,Math.round(config.width*scale)),h=Math.max(1,Math.round(config.height*scale));
   src=await source(config.source,w,h);
   let diagnostic='';
   engine=IndexWebGL2Lab.create({surface:hooks.surface,legacyCanvas:hooks.legacy,emptyElement:hooks.end,onDiagnostic:(_,message)=>{diagnostic=message;}});
   canvas=hooks.surface.querySelector('#pg-gpu-lab');gl=canvas.getContext('webgl2');result.environment=environment(gl);
   const gen={role:'generator',manifest:{},visible:true,opacity:1,blend:'normal'},layer={role:'effect-webgl2',manifest:m,visible:true,opacity:1,blend:'normal',alpha:{}};
   let frameId=0;const cpu=[];
   async function draw(state,frame,running=true,id=++frameId,withFX=true,measure=false){
    if(stopped())throw Error('STOPPED');
    const bitmap=await src.bitmap(frame,frame/config.fps);gen.bitmap=bitmap;layer.state=state;
    try{
     const q=measure?timer?.begin():null,start=performance.now();let ok;
     try{ok=engine.render(withFX?[gen,layer]:[gen],config.width,config.height,{running,time:frame/config.fps,frameId:id});}
     finally{if(measure){cpu.push(performance.now()-start);timer?.end(q);}}
     assert(ok&&!diagnostic&&!gl.isContextLost()&&!fx?.stats().error,diagnostic||fx?.stats().error||'Render failed');
    }finally{bitmap.close();gen.bitmap=null;}
   }
   const defaults=IndexFXPreview.defaults(m);
   await draw(defaults,0,false,++frameId,false);
   const dry=sample(gl,w,h);result.actual={width:canvas.width,height:canvas.height};result.dryCorners=dry.stats.corners;
   if(config.source==='moving'||config.source==='chart'){
    const expected=[[255,0,0],[0,255,0],[0,0,255],[255,255,0]];
    assert(dry.stats.corners.every((c,i)=>expected[i].every((v,j)=>Math.abs(v-c[j])<5)),'Dry corner orientation oracle failed');
   }
   const baselineBytes=engine.getStats().textureBytesEstimate;
   const t=performance.now();fx=engine.createFX('qa-primary',m.effect);result.compileAllocateCpuMs=performance.now()-t;layer.fx=fx;
   result.textureBytesEstimate=engine.getStats().textureBytesEstimate;result.fxTextureBytesEstimate=result.textureBytesEstimate-baselineBytes;
   timer=gpuTimer(gl);
   planned=plan(m,config.full!==false);result.plannedCases=planned.length;
   for(const item of planned){
    if(stopped())throw Error('STOPPED');
    const record={name:item.name,state:item.state,status:'NOT_RUN'};
    try{
     fx.resetHistory();
     for(let f=0;f<3;f++)await draw(item.state,f,true,++frameId,true,false);
     assert(fx.stats().frame===3,'Unexpected frame count');
     const image=sample(gl,w,h);record.pixelStats=image.stats;
     if(item.name==='defaults'){
      record.sha256=await sha(image.pixels);
      const thumb=document.createElement('canvas');thumb.width=320;thumb.height=Math.round(320*h/w);thumb.getContext('2d').drawImage(canvas,0,0,thumb.width,thumb.height);result.defaultPreview=thumb.toDataURL('image/png');
      record.previewDataUrlSha256=await sha(new TextEncoder().encode(result.defaultPreview));
     }
     if(image.stats.nonzeroAlpha===0||image.stats.variance<.1)result.observations.push(item.name+': transparent or near-uniform output — visual review required');
     record.status='PASS';
    }catch(e){record.status=e.message==='STOPPED'?'NOT_RUN':'FAIL';record.error=e.message;result.cases.push(record);throw e;}
    result.cases.push(record);hooks.caseDone?.(record,result);await yieldFrame();
   }
   if(m.effect.history){
    fx.resetHistory();await draw(defaults,0,true,100000);assert(fx.stats().frame===1&&fx.stats().seeded,'History seed failed');
    await draw(defaults,0,true,100000);assert(fx.stats().frame===1,'History advanced twice');
    await draw(defaults,1,false,100001);assert(fx.stats().frame===1,'Pause advanced history');
    layer.opacity=0;await draw(defaults,2,true,100002);assert(fx.stats().frame===2,'Wet zero did not advance history');
    const wetZero=sample(gl,w,h);await draw(defaults,2,false,100003,false);const dryNow=sample(gl,w,h);
    assert(await sha(wetZero.pixels)===await sha(dryNow.pixels),'Wet zero output differs from dry input');
    layer.opacity=1;layer.visible=false;await draw(defaults,3,true,100004);assert(fx.stats().frame===2,'Hidden history advanced');
    layer.visible=true;await draw(defaults,4,true,100005);assert(fx.stats().frame===3,'Resume did not advance');
    fx.resetHistory();assert(fx.stats().frame===0&&!fx.stats().seeded,'Reset failed');
    result.historyChecks='PASS';
   }else result.historyChecks='NOT_APPLICABLE';
   // Timing pilot: no readback inside measured frames. CPU is render-call wall time only.
   fx.resetHistory();for(let i=0;i<3;i++)await draw(defaults,i);
   for(let i=0;i<12;i++){await draw(defaults,i+3,true,++frameId,true,true);await yieldFrame();}
   result.cpuRenderMs=summary(cpu);result.gpuCompositeMs=await timer.finish();
   fx.dispose();fx=null;assert(engine.getStats().textureBytesEstimate===baselineBytes,'FX texture estimate did not return to baseline');result.cleanup='PASS';
   result.status='PASS';
  }catch(e){result.status=e.message==='STOPPED'?'NOT_RUN':!result.actual?'BLOCKED':'FAIL';result.error=String(e.message||e);}
  finally{timer?.dispose();fx?.dispose();engine?.dispose();gl?.getExtension('WEBGL_lose_context')?.loseContext();src?.dispose();}
  for(const item of planned.slice(result.cases.length))result.cases.push({name:item.name,state:item.state,status:'NOT_RUN',error:'Earlier case failed or run stopped'});
  return result;
 }
 function csv(report){
  const keys=['id','name','version','status','passes','history','actualWidth','actualHeight','casesPassed','casesTotal','cpuP95Ms','gpuP95Ms','gpuStatus','textureBytesEstimate','exportSha256','error','observations'];
  const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  return [keys.join(','),...report.results.map(r=>[r.id,r.name,r.version,r.status,r.passes,r.history,r.actual?.width,r.actual?.height,r.cases.filter(c=>c.status==='PASS').length,r.plannedCases,r.cpuRenderMs?.p95,r.gpuCompositeMs?.p95,r.gpuCompositeMs?.status,r.textureBytesEstimate,r.exportSha256,r.error,r.observations.join('; ')].map(quote).join(','))].join('\r\n')+'\r\n';
 }
 window.IndexFXQA={BASELINE,PILOT,catalogue,load,plan,run,csv,summary,sha};
})();