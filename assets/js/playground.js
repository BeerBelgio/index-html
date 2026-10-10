(() => {
'use strict';
const $=id=>document.getElementById(id);
const ui={stage:$('pg-stage'),surface:$('pg-surface'),frameHost:$('pg-frame-host'),composite:$('pg-composite'),empty:$('pg-empty'),placeholderArt:$('pg-placeholder-art'),layers:$('pg-layers'),loadTarget:$('pg-load-target'),params:$('pg-params'),colors:$('pg-colors'),paramsLayer:$('pg-params-layer'),colorsLayer:$('pg-colors-layer'),drop:$('pg-drop'),file:$('pg-file'),select:$('pg-select'),load:$('pg-load'),status:$('pg-status'),log:$('pg-log'),diagnostics:$('pg-diagnostics'),title:$('pg-title'),role:$('pg-role'),fpsTarget:$('pg-fps-target'),perf:$('pg-performance'),perfFps:$('pg-perf-fps'),perfCpu:$('pg-perf-cpu'),perfBudget:$('pg-perf-budget'),gaugeFps:$('pg-gauge-fps'),gaugeCpu:$('pg-gauge-cpu'),gaugeBudget:$('pg-gauge-budget'),play:$('pg-play'),reset:$('pg-reset')};
const idleArt='assets/branding/playground_NOTOOL.svg?v=0192';
const loadingArt='assets/branding/playground_LOADING-TOOL.svg?v=0194';
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const layers=Array.from({length:5},(_,i)=>({id:i+1,token:0,frame:null,bitmap:null,fx:null,manifest:null,role:null,state:null,alpha:{},name:'',pending:false,visible:true,opacity:1,blend:'normal',loading:false,firstFrame:false,loadTimer:0,abort:null,drawCost:0}));
let selected=0,catalogue=[],running=false,raf=0,last=0,clock=0,scheduledAt=0,dirty=true,canvasW=0,canvasH=0,frameCosts=[],paintCount=0,perfStart=0,autoTicks=[],previousTick=0,perfWindows=0;
const ctx=ui.composite.getContext('2d',{alpha:true});
const log=(m)=>{ui.log.textContent=(ui.log.textContent==='Awaiting tool…'?'':ui.log.textContent+'\n')+m;ui.log.scrollTop=ui.log.scrollHeight;};
const info=(m)=>{ui.status.textContent=m;ui.status.classList.remove('pg-status-error');};
const fail=(m,layer=null)=>{if(layer)log('ERROR L'+layer.id+': '+m);else log('ERROR: '+m);ui.status.textContent=(layer?'L'+layer.id+': ':'')+m;ui.status.classList.add('pg-status-error');ui.diagnostics.open=true;};
const active=()=>layers[selected];
const loaded=()=>layers.filter(l=>l.manifest&&!l.loading);
const visibleReady=()=>layers.some(l=>l.visible&&l.manifest&&l.firstFrame&&(l.role==='effect'||!!l.bitmap));
const fpsCap=()=>ui.fpsTarget.value==='auto'?0:Number(ui.fpsTarget.value);
function gauge(key,val,unit,ratio,health='idle'){
 const upper=key[0].toUpperCase()+key.slice(1),out=ui['perf'+upper],arc=ui['gauge'+upper];
 out.textContent=val===null?'—'+(unit?' '+unit:''):val+(unit?' '+unit:'');
 arc.style.strokeDashoffset=(100-100*clamp(ratio||0,0,1)).toFixed(1);
 arc.closest('.pg-mini-meter').dataset.health=health;
}
function resetPerf(){frameCosts=[];paintCount=0;perfStart=0;perfWindows=0;autoTicks=[];previousTick=0;scheduledAt=0;gauge('fps',null,'',0);gauge('cpu',null,'ms',0);gauge('budget',fpsCap()?(1000/fpsCap()).toFixed(1):null,'ms',0);ui.perf.dataset.health='idle';}
function updatePerf(now){if(!running)return;if(!perfStart){perfStart=now;return;}const elapsed=now-perfStart;if(elapsed<1050)return;
 const fps=paintCount*1000/elapsed, cpu=frameCosts.length?frameCosts.reduce((a,b)=>a+b,0)/frameCosts.length:0;
 const cap=fpsCap(),sorted=[...autoTicks].sort((a,b)=>a-b),auto=sorted[Math.floor(sorted.length/2)]||null;
 const budget=cap?1000/cap:auto,goal=cap||(auto?1000/auto:60),load=budget?cpu/budget:0;
 const health=cap&&perfWindows>0&&fps<cap*.7||load>.96?'critical':cap&&perfWindows>0&&fps<cap*.88||load>.78?'warning':'good';
 ui.perf.dataset.health=health;
 gauge('fps',fps.toFixed(1),'',fps/goal,health);gauge('cpu',frameCosts.length?cpu.toFixed(2):null,'ms',load,load>.96?'critical':load>.78?'warning':'good');
 gauge('budget',budget?budget.toFixed(1):null,'ms',Math.max(0,1-load),health);
 frameCosts=[];paintCount=0;perfStart=now;perfWindows++;
}
ui.fpsTarget.addEventListener('change',resetPerf);
function placeholder(){const any=visibleReady();const busy=layers.some(l=>l.loading);ui.empty.hidden=any;ui.placeholderArt.src=busy?loadingArt:idleArt;ui.placeholderArt.alt=busy?'Loading tool':'Drop a tool to start';ui.empty.setAttribute('aria-busy',String(busy));ui.role.textContent=layers.filter(l=>l.manifest).length+' / 5 LAYERS';}
function normalize(raw){if(!raw||!Array.isArray(raw.params)||!Array.isArray(raw.colors))throw Error('Manifest needs params[] and colors[].');const seen=new Set();for(const x of [...raw.params,...raw.colors]){if(!x.key||seen.has(x.key))throw Error('Duplicate/missing control key: '+x.key);seen.add(x.key);}for(const p of raw.params)if(![p.min,p.max,p.step,p.default].every(n=>Number.isFinite(Number(n)))||Number(p.step)<=0||Number(p.min)>Number(p.max))throw Error('Invalid numeric parameter: '+p.key);for(const c of raw.colors)if(!/^#[0-9a-f]{6}$/i.test(c.default))throw Error('Invalid HEX color: '+c.key);return {...raw,role:raw.index?.role||raw.role||'generator',effect:raw.index?.effect||raw.effect||null};}
function safeHtml(html,layerId,token){
 const boot=`<script>(function(){const lid=${layerId},token=${token};const originalGetContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,options){if(/^(webgl2?|experimental-webgl)$/i.test(type))options={...(options||{}),preserveDrawingBuffer:true};return originalGetContext.call(this,type,options)};const send=(type,data,bitmap)=>{const msg={indexPlaygroundLayer:lid,token,type,data};if(bitmap){msg.bitmap=bitmap;parent.postMessage(msg,'*',[bitmap]);}else parent.postMessage(msg,'*');};addEventListener('error',e=>send('error',e.message));addEventListener('unhandledrejection',e=>send('error',String(e.reason)));let pending=false;addEventListener('message',async e=>{const m=e.data;if(e.source!==parent||!m||m.layerCommand!==lid||m.token!==token)return;try{if(m.action==='resize'){const fn=window.indexResize||window.sketchResize;if(fn)fn(m.width,m.height)}if(m.action==='draw'&&!pending){pending=true;const start=performance.now();try{const fn=window.indexDraw||window.sketchDraw;if(fn)await fn(m.state,m.context);const drawMs=performance.now()-start;const canvas=document.querySelector('#sketch-canvas')||document.querySelector('canvas');if(!canvas)throw Error('Generator canvas not found');const bitmap=await createImageBitmap(canvas);send('frame',{drawMs},bitmap);}finally{pending=false}}}catch(err){pending=false;send('error',String(err.stack||err))}});})();<\/script>`;
 const end=`<script>(function(){try{const raw=window.INDEX_TOOL||window.SKETCH_TOOL;if(!raw)throw Error('INDEX_TOOL/SKETCH_TOOL manifest not found');parent.postMessage({indexPlaygroundLayer:${layerId},token:${token},type:'ready',data:{manifest:JSON.parse(JSON.stringify(raw)),native:!!window.INDEX_TOOL,hasDraw:typeof(window.indexDraw||window.sketchDraw)==='function',hasResize:typeof(window.indexResize||window.sketchResize)==='function'}},'*');}catch(err){parent.postMessage({indexPlaygroundLayer:${layerId},token:${token},type:'error',data:String(err)},'*')}})();<\/script>`;
 const policy=`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' blob:; style-src 'unsafe-inline'; img-src blob: data:; font-src data:; media-src blob: data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">`;
 if(/<head\b[^>]*>/i.test(html))html=html.replace(/<head\b[^>]*>/i,m=>m+policy+boot);else html=policy+boot+html;
 if(/<\/body>/i.test(html))return html.replace(/<\/body>/i,end+'</body>');return html+end;
}
function send(layer,action,more={}){layer.frame?.contentWindow?.postMessage({layerCommand:layer.id,token:layer.token,action,...more},'*');}
function kill(layer){clearTimeout(layer.loadTimer);layer.abort?.abort();layer.abort=null;layer.frame?.remove();layer.frame=null;layer.bitmap?.close();layer.bitmap=null;layer.fx?.dispose();layer.fx=null;layer.pending=false;layer.firstFrame=false;layer.loading=false;layer.manifest=null;layer.role=null;layer.state=null;layer.alpha={};layer.name='';layer.drawCost=0;layer.token++;}
function clearLayer(layer){kill(layer);if(!loaded().length){running=false;cancelAnimationFrame(raf);raf=0;ui.play.textContent='PAUSE';resetPerf();}dirty=true;renderLayerRack();renderEditor();placeholder();paint();info('Cleared L'+layer.id);}
function beginLoad(layer,name){kill(layer);layer.loading=true;layer.name=name;const token=layer.token;
 layer.loadTimer=setTimeout(()=>{if(layer.token!==token||layer.firstFrame)return;fail('No first frame after 16 seconds. This tool may be blocking the browser.',layer);layer.loading=false;renderLayerRack();placeholder();},16000);
 renderLayerRack();renderEditor();placeholder();info('Loading '+name+' into L'+layer.id+'…');log('L'+layer.id+' loading '+name);
 return token;
}
function openLayer(layer,html,name,token){if(layer.token!==token)return;if(html.length>2*1024*1024)throw Error('Maximum HTML size is 2 MB.');
 const frame=document.createElement('iframe');frame.className='pg-layer-frame';frame.setAttribute('sandbox','allow-scripts');frame.setAttribute('referrerpolicy','no-referrer');frame.title='Isolated L'+layer.id+' visual renderer';frame.setAttribute('aria-hidden','true');
 layer.frame=frame;ui.frameHost.append(frame);frame.srcdoc=safeHtml(html,layer.id,token);
 info('Inspecting L'+layer.id+' manifest…');
}
async function local(file){const layer=active();if(!file||(!/\.html?$/i.test(file.name)&&file.type!=='text/html')){fail('Choose an HTML file.');return;}if(file.size>2*1024*1024){fail('Maximum HTML size is 2 MB.');return;}
 const token=beginLoad(layer,file.name);try{const content=await file.text();openLayer(layer,content,file.name,token)}catch(e){if(layer.token===token){layer.loading=false;fail(e.message,layer);renderLayerRack();placeholder();}}}
ui.file.addEventListener('change',()=>{if(ui.file.files[0])local(ui.file.files[0]);ui.file.value='';});ui.file.previousElementSibling?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();ui.file.click();}});
for(const evt of ['dragenter','dragover'])ui.drop.addEventListener(evt,e=>{e.preventDefault();ui.drop.classList.add('drag')});
for(const evt of ['dragleave','drop'])ui.drop.addEventListener(evt,e=>{e.preventDefault();ui.drop.classList.remove('drag')});
ui.drop.addEventListener('drop',e=>{if(e.dataTransfer.files[0])local(e.dataTransfer.files[0]);});
fetch('data/tools.json').then(r=>{if(!r.ok)throw Error('Catalogue HTTP '+r.status);return r.json()}).then(data=>{catalogue=data.tools||[];for(const tool of catalogue){const opt=document.createElement('option');opt.value=tool.toolId;opt.textContent=tool.name+' · '+tool.version;ui.select.append(opt);}}).catch(e=>log('Catalogue unavailable: '+e.message));
ui.select.addEventListener('change',()=>ui.load.disabled=!ui.select.value);
ui.load.addEventListener('click',async()=>{const item=catalogue.find(t=>t.toolId===ui.select.value);if(!item)return;const layer=active(),token=beginLoad(layer,item.name);ui.load.disabled=true;
 try{const ctrl=new AbortController();layer.abort=ctrl;const r=await fetch(item.file,{cache:'no-store',signal:ctrl.signal});if(!r.ok)throw Error('HTTP '+r.status);const content=await r.text();openLayer(layer,content,item.name,token);}catch(err){if(layer.token===token){layer.loading=false;fail(err.message,layer);renderLayerRack();placeholder();}}finally{ui.load.disabled=!ui.select.value;}});
function paramsFrom(manifest){const state={time:clock},alpha={};for(const p of manifest.params)state[p.key]=Number(p.default);for(const c of manifest.colors){state[c.key]=c.default;alpha[c.key]=1;}return {state,alpha};}
function activate(layer,raw){const manifest=normalize(raw.manifest),role=manifest.role;if(role!=='generator'&&role!=='effect')throw Error('Unsupported role '+role+'. Compositor A/B requires a separate tool contract.');
 if(role==='generator'&&(!raw.hasResize||!raw.hasDraw))throw Error('Missing resize/draw entrypoint.');
 if(role==='effect'&&(manifest.effect?.type!=='fragment'||typeof manifest.effect?.fragment!=='string'))throw Error('FX needs GLSL fragment shader.');
 const {state,alpha}=paramsFrom(manifest);layer.name=manifest.name||layer.name;layer.manifest=manifest;layer.role=role;layer.state=state;layer.alpha=alpha;
 if(role==='effect'){layer.fx=makeFx(manifest.effect.fragment);layer.fx.manifest=manifest;layer.firstFrame=true;layer.loading=false;clearTimeout(layer.loadTimer);}
 else resizeOne(layer);
 renderLayerRack();if(active()===layer)renderEditor();placeholder();dirty=true;
 if(!running&&layers.filter(x=>x.manifest).length===1){running=true;ui.play.textContent='PAUSE';resetPerf();}
 info('L'+layer.id+' ready: '+manifest.name+' · '+manifest.params.length+' parameters · '+manifest.colors.length+' colors');
 log('L'+layer.id+' manifest ready · '+role+(raw.native?' · INDEX_NATIVE':' · LEGACY'));
 if(!running)paint();else if(!raf)raf=requestAnimationFrame(tick);
}
window.addEventListener('message',event=>{
 const msg=event.data;
 if(!msg||!Number.isInteger(msg.indexPlaygroundLayer)||msg.indexPlaygroundLayer<1||msg.indexPlaygroundLayer>5){return;}
 const layer=layers[msg.indexPlaygroundLayer-1];
 if(event.source!==layer.frame?.contentWindow||msg.token!==layer.token){msg.bitmap?.close?.();return;}
 if(msg.type==='error'){layer.pending=false;layer.loading=false;clearTimeout(layer.loadTimer);fail(String(msg.data).slice(0,1300),layer);renderLayerRack();placeholder();return;}
 if(msg.type==='ready'){try{activate(layer,msg.data)}catch(err){layer.loading=false;clearTimeout(layer.loadTimer);fail(err.message,layer);renderLayerRack();placeholder();}return;}
 if(msg.type==='frame'){
  if(layer.bitmap&&layer.bitmap!==msg.bitmap)layer.bitmap.close();
  layer.bitmap=msg.bitmap;layer.pending=false;layer.drawCost=Number(msg.data?.drawMs)||0;
  const wasFirst=!layer.firstFrame;
  if(wasFirst){layer.firstFrame=true;layer.loading=false;clearTimeout(layer.loadTimer);info('L'+layer.id+' first frame ready: '+layer.name);log('L'+layer.id+' first frame displayed');}
  if(wasFirst){placeholder();renderLayerRack();}dirty=true;if(!running)paint();
 }
});
function resizeOne(layer){if(layer.role==='generator')send(layer,'resize',{width:canvasW,height:canvasH});else if(layer.role==='effect')layer.fx?.resize(canvasW,canvasH);}
function resize(){const rect=ui.surface.getBoundingClientRect();const scale=Math.min(1.5,window.devicePixelRatio||1);const w=Math.max(1,Math.round(rect.width*scale)),h=Math.max(1,Math.round(rect.height*scale));
 if(w===canvasW&&h===canvasH)return;canvasW=w;canvasH=h;ui.composite.width=w;ui.composite.height=h;
 for(const l of layers)resizeOne(l);dirty=true;if(!running)paint();}
const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(ui.surface);
function choose(index){selected=index;ui.loadTarget.textContent=(layers[index].manifest?'REPLACE ':'LOAD TO ')+'L'+(index+1);
 renderLayerRack();renderEditor();}
function renderLayerRack(){const focus=document.activeElement,id=focus?.dataset?.focusKey;
 ui.layers.replaceChildren();for(const layer of layers){const card=document.createElement('div');card.className='pg-layer-card'+(selected===layer.id-1?' is-active':'')+(layer.loading?' is-loading':'');
 const top=document.createElement('div');top.className='pg-layer-top';
 const pick=document.createElement('button');pick.type='button';pick.className='pg-layer-pick';pick.textContent='L'+layer.id;pick.dataset.focusKey='pick-'+layer.id;pick.setAttribute('aria-pressed',String(selected===layer.id-1));pick.addEventListener('click',()=>choose(layer.id-1));
 const eye=document.createElement('button');eye.type='button';eye.className='pg-layer-visibility';eye.textContent=layer.visible?'ON':'OFF';eye.dataset.focusKey='vis-'+layer.id;eye.setAttribute('aria-pressed',String(layer.visible));eye.title='L'+layer.id+' visibility';eye.addEventListener('click',()=>{layer.visible=!layer.visible;dirty=true;renderLayerRack();placeholder();paint();});
 const clear=document.createElement('button');clear.type='button';clear.className='pg-layer-clear';clear.textContent='×';clear.dataset.focusKey='clear-'+layer.id;clear.disabled=!layer.manifest&&!layer.loading;clear.title='Clear L'+layer.id;clear.setAttribute('aria-label','Clear L'+layer.id);clear.addEventListener('click',()=>clearLayer(layer));
 top.append(pick,eye,clear);const tool=document.createElement('div');tool.className='pg-layer-name';tool.title=layer.name||'Empty';tool.textContent=layer.loading?'LOADING…':layer.name||'EMPTY LAYER';
 const row=document.createElement('div');row.className='pg-opacity-row';
 const slider=document.createElement('input');slider.type='range';slider.min='0';slider.max='100';slider.step='1';slider.value=String(Math.round(layer.opacity*100));slider.className='pg-opacity-slider';slider.dataset.focusKey='opacity-'+layer.id;slider.setAttribute('aria-label','L'+layer.id+' opacity percentage');
 const numeric=document.createElement('input');numeric.type='number';numeric.min='0';numeric.max='100';numeric.step='1';numeric.value=slider.value;numeric.className='pg-opacity-number';numeric.dataset.focusKey='num-'+layer.id;numeric.setAttribute('aria-label','L'+layer.id+' opacity percentage');
 const updateOpacity=value=>{const num=Number(value);const current=Math.round(layer.opacity*100);const pct=value===''||!Number.isFinite(num)?current:Math.round(clamp(num,0,100));layer.opacity=pct/100;slider.value=String(pct);numeric.value=String(pct);dirty=true;if(!running){if(pct>0&&layer.role==='generator'&&!layer.bitmap)requestDraw(layer);paint();}};
 slider.addEventListener('input',()=>updateOpacity(slider.value));numeric.addEventListener('change',()=>updateOpacity(numeric.value));
 const perc=document.createElement('span');perc.textContent='%';row.append(slider,numeric,perc);
 const blend=document.createElement('select');blend.className='pg-blend-select';blend.dataset.focusKey='blend-'+layer.id;blend.setAttribute('aria-label','L'+layer.id+' blend mode');for(const [v,n] of [['normal','NORMAL'],['add','ADD'],['multiply','MULTIPLY'],['screen','SCREEN']]){const o=document.createElement('option');o.value=v;o.textContent=n;blend.append(o);}blend.value=layer.blend;blend.addEventListener('change',()=>{layer.blend=blend.value;dirty=true;if(!running)paint();});
 card.append(top,tool,row,blend);ui.layers.append(card);}
 if(id){const item=ui.layers.querySelector(`[data-focus-key="${id}"]`);item?.focus({preventScroll:true});}
 ui.loadTarget.textContent=(active().manifest?'REPLACE ':'LOAD TO ')+'L'+active().id;
}
function renderEditor(){const l=active();ui.paramsLayer.textContent='L'+l.id;ui.colorsLayer.textContent='L'+l.id;ui.title.textContent=l.manifest?.name||l.name||'NO TOOL';ui.play.disabled=!layers.some(layer=>layer.manifest);ui.reset.disabled=!l.manifest;
 const build=(target,items,isColor)=>{target.replaceChildren();if(!items.length){const p=document.createElement('p');p.textContent=l.loading?'Loading tool…':'None exposed.';target.append(p);return;}
 for(const item of items){const row=document.createElement('div');row.className='pg-control'+(isColor?' pg-color':'');const head=document.createElement('div');head.className='pg-control-label';const label=document.createElement('span');label.textContent=item.label||item.key;const output=document.createElement('output');output.textContent=l.state[item.key];head.append(label,output);row.append(head);
 if(isColor){const picker=document.createElement('input');picker.type='color';picker.value=l.state[item.key];picker.setAttribute('aria-label',(item.label||item.key)+' color');picker.addEventListener('input',()=>{l.state[item.key]=picker.value;output.textContent=picker.value;dirty=true;if(!running)requestSingle(l);});row.append(picker);}
 const range=document.createElement('input');range.type='range';range.min=isColor?0:item.min;range.max=isColor?1:item.max;range.step=isColor?.01:item.step;range.value=isColor?l.alpha[item.key]:l.state[item.key];range.setAttribute('aria-label',(item.label||item.key)+(isColor?' opacity':''));range.addEventListener('input',()=>{if(isColor)l.alpha[item.key]=Number(range.value);else{l.state[item.key]=Number(range.value);output.textContent=range.value;}dirty=true;if(!running)requestSingle(l);});row.append(range);target.append(row);}
 };
 build(ui.params,l.manifest?.params||[],false);build(ui.colors,l.manifest?.colors||[],true);
 requestAnimationFrame(matchParameterHeight);
}
function matchParameterHeight(){if(window.innerWidth<=900){ui.stage.style.minHeight='';return;}ui.stage.style.minHeight=Math.max(340,Math.ceil(ui.params.getBoundingClientRect().height))+'px';}
const obsParams=new ResizeObserver(matchParameterHeight);obsParams.observe(ui.params);window.addEventListener('resize',matchParameterHeight,{passive:true});
function requestSingle(l){if(l.role==='generator')requestDraw(l);else paint();}
function requestDraw(l){if(!l.manifest||l.pending||!l.visible||l.opacity<=0||l.role!=='generator'||!l.frame)return;
 l.pending=true;l.state.time=clock;send(l,'draw',{state:{...l.state},context:{colorOpacity:{...l.alpha}}});}
function blendOp(name){return {normal:'source-over',add:'lighter',multiply:'multiply',screen:'screen'}[name]||'source-over';}
function paint(){if(!canvasW||!canvasH)return;const started=performance.now();ctx.clearRect(0,0,canvasW,canvasH);
 for(const l of layers){if(!l.visible||!l.manifest||l.loading||l.opacity<=0)continue;
  if(l.role==='generator'){if(!l.bitmap)continue;ctx.save();ctx.globalAlpha=l.opacity;ctx.globalCompositeOperation=blendOp(l.blend);ctx.drawImage(l.bitmap,0,0,canvasW,canvasH);ctx.restore();}
  else if(l.role==='effect'&&l.fx){try{const result=l.fx.draw(ui.composite,l.state,l.alpha);if(!result)continue;
   // Keep the lower composite while applying the effect as a strength-controlled layer.
   ctx.save();ctx.globalAlpha=l.opacity;ctx.globalCompositeOperation=blendOp(l.blend);ctx.drawImage(result,0,0,canvasW,canvasH);ctx.restore();
  }catch(e){fail('FX processing: '+e.message,l);l.visible=false;renderLayerRack();}}
 }
 dirty=false;paintCount++;const childCpu=layers.reduce((a,l)=>a+(l.visible&&l.role==='generator'?l.drawCost:0),0);frameCosts.push(Math.max(0,performance.now()-started)+childCpu);if(frameCosts.length>90)frameCosts.shift();
}
function tick(now){if(!running){raf=0;return;}if(previousTick){const d=now-previousTick;if(d>=4&&d<80){autoTicks.push(d);if(autoTicks.length>60)autoTicks.shift();}}previousTick=now;
 if(last)clock+=Math.min(.05,Math.max(0,(now-last)/1000));last=now;
 const cap=fpsCap(),interval=cap?1000/cap:0;if(!cap||!scheduledAt||now-scheduledAt>=interval-.75){scheduledAt=now;
  for(const l of layers){if(l.state)l.state.time=clock;if(l.role==='generator')requestDraw(l);}if(visibleReady())paint();}
 updatePerf(now);raf=requestAnimationFrame(tick);
}
ui.play.addEventListener('click',()=>{if(!loaded().length)return;running=!running;ui.play.textContent=running?'PAUSE':'PLAY';cancelAnimationFrame(raf);raf=0;last=0;previousTick=0;resetPerf();if(running){ui.perf.dataset.health='monitoring';raf=requestAnimationFrame(tick);}else{ui.perf.dataset.health='paused';gauge('fps','0.0','',0,'paused');}});
ui.reset.addEventListener('click',()=>{const l=active();if(!l.manifest)return;const defaults=paramsFrom(l.manifest);l.state=defaults.state;l.state.time=clock;l.alpha=defaults.alpha;renderEditor();if(!running)requestSingle(l);info('L'+l.id+' reset to manifest defaults.');});
$('pg-clear').addEventListener('click',()=>{ui.log.textContent='';});
function makeFx(fragment){const canvas=document.createElement('canvas'),gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,preserveDrawingBuffer:true});if(!gl)throw Error('WebGL unavailable.');
 const vertex='attribute vec2 aPos;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(aPos,0.,1.);}';
 function compile(type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw Error('GLSL: '+error);}return shader;}
 const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);const prog=gl.createProgram();gl.attachShader(prog,vs);gl.attachShader(prog,fs);gl.linkProgram(prog);gl.deleteShader(vs);gl.deleteShader(fs);
 if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw Error('Shader link: '+gl.getProgramInfoLog(prog));
 const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]),gl.STATIC_DRAW);
 const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);for(const [k,v] of [[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE]])gl.texParameteri(gl.TEXTURE_2D,k,v);
 const uniform=name=>gl.getUniformLocation(prog,name);
 return {canvas,resize(w,h){canvas.width=w;canvas.height=h;},draw(input,state,alpha){if(!canvas.width||!canvas.height)return null;gl.viewport(0,0,canvas.width,canvas.height);gl.useProgram(prog);gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  for(const [name,offset] of [['aPos',0],['aUV',8]]){const loc=gl.getAttribLocation(prog,name);if(loc>=0){gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,16,offset);}}
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,0);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,input);
  if(uniform('uInput')!==null)gl.uniform1i(uniform('uInput'),0);if(uniform('uResolution')!==null)gl.uniform2f(uniform('uResolution'),canvas.width,canvas.height);if(uniform('uTime')!==null)gl.uniform1f(uniform('uTime'),state.time||0);
  for(const p of this.manifest.params){const n=uniform('u_'+p.key);if(n!==null)gl.uniform1f(n,state[p.key]);}
  for(const c of this.manifest.colors){const n=uniform('u_'+c.key);if(n!==null){const hex=state[c.key],rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);gl.uniform4f(n,...rgb,alpha[c.key]??1);}}
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);return canvas;
 },manifest:null,dispose(){gl.deleteTexture(tex);gl.deleteBuffer(buf);gl.deleteProgram(prog);}};
}
// Each effect uses the actual lower-layer composite as its uInput texture.
// The layer's own runtime is never allowed to make network requests.
// No page data is persisted or uploaded: reload starts a fresh five-layer session.
renderLayerRack();renderEditor();placeholder();resetPerf();resize();
})();
