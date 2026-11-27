/* INDEX host preview adapter. Uses the existing compositor; never executes exported HTML. */
(() => {
  'use strict';
  const manifests=new Map();
  async function manifest(tool) {
    if (!manifests.has(tool.toolId)) {
      const promise=(async()=>{
        const response=await fetch(tool.file,{cache:'no-store'});
        if(!response.ok)throw Error('FX HTTP '+response.status);
        const html=await response.text();
        // OpenMosh exporter writes a JSON literal. Do not eval or execute arbitrary HTML.
        const match=html.match(/window\.INDEX_TOOL\s*=\s*(\{[\s\S]*?\n\});/);
        if(!match)throw Error('FX manifest is not a JSON export.');
        const m=JSON.parse(match[1]);
        const assessment=window.IndexImportPreflight.assess(m,{native:true,nativeControls:true});
        if(assessment.status==='UNSUPPORTED'||assessment.role!=='effect-webgl2')throw Error(assessment.reason);
        if(m.effect.moduleId!==tool.toolId||m.effect.moduleVersion!==tool.version)throw Error('FX catalogue identity mismatch.');
        return m;
      })();
      manifests.set(tool.toolId,promise);
      promise.catch(()=>manifests.delete(tool.toolId));
    }
    return manifests.get(tool.toolId);
  }
  function defaults(m){return Object.fromEntries([...m.params,...m.colors].map(p=>[p.key,p.default]));}
  let sourceImage;
  function favicon(){
    if(!sourceImage)sourceImage=new Promise((resolve,reject)=>{
      const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('INDEX favicon unavailable'));img.src='assets/branding/favicon.svg';
    });
    return sourceImage;
  }
  async function create(width,height){
    const img=await favicon();
    const paper=document.createElement('canvas');paper.width=width;paper.height=height;
    const ctx=paper.getContext('2d');ctx.fillStyle='#f6f2e7';ctx.fillRect(0,0,width,height);
    const size=Math.round(Math.min(width,height)*.83);
    // Slightly off-centre, fixed common source: makes geometric distortions readable.
    ctx.drawImage(img,Math.round((width-size)*.43),Math.round((height-size)*.46),size,size);
    const bitmap=await createImageBitmap(paper);
    const surface=document.createElement('div'),legacy=document.createElement('canvas'),end=document.createElement('span');
    surface.append(legacy,end);
    let engine,instance,current,serial=0,frame=0,error='';
    try{engine=window.IndexWebGL2Lab.create({surface,legacyCanvas:legacy,emptyElement:end,onDiagnostic:(_,message)=>{error=message;}});}
    catch(e){bitmap.close();throw e;}
    const canvas=surface.querySelector('#pg-gpu-lab');
    function clear(){instance?.dispose();instance=null;current=null;frame=0;error='';}
    function select(m){clear();instance=engine.createFX('preview-'+(++serial),m.effect);current=m;}
    function draw(state,time=0,running=false){
      if(!instance||!current)throw Error('No preview FX selected');
      const layers=[{role:'generator',manifest:{},bitmap,visible:true,opacity:1,blend:'normal'},
        {role:'effect-webgl2',manifest:current,fx:instance,state,alpha:{},visible:true,opacity:1,blend:'normal'}];
      if(!engine.render(layers,width,height,{running,time,frameId:++frame})||error||instance.stats().error)throw Error(error||instance.stats().error||'FX preview unavailable');
      return canvas;
    }
    function dispose(){clear();engine.dispose();bitmap.close();canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();}
    return {select,draw,clear,dispose,resetHistory:()=>instance?.resetHistory(),stats:()=>instance?.stats()};
  }
  function copyCanvas(source,target){if(target.width!==source.width)target.width=source.width;if(target.height!==source.height)target.height=source.height;target.getContext('2d').drawImage(source,0,0);}
  function demonstration(m,state,time){
    // Use a single deterministic numeric sweep for hover, never edit manifest/defaults.
    const p=m.params.find(p=>!['speed','rate'].includes(p.key.toLowerCase())&&window.IndexNumericControls.kind(p)==='slider'&&Number(p.max)>Number(p.min));
    if(p){const steps=Math.round((Number(p.max)-Number(p.min))/Number(p.step));const f=.25+.65*(.5-.5*Math.cos(time*1.6));state[p.key]=Number((Number(p.min)+Math.round(f*steps)*Number(p.step)).toFixed(8));}
    return state;
  }
  function gallery(){
    let rendererPromise,renderer,disposed=false,busy=false,hover=null,active=null,raf=0,last=0;
    const queue=[];
    async function getRenderer(){
      if(!rendererPromise)rendererPromise=create(320,180).then(r=>{if(disposed){r.dispose();throw Error('Gallery disposed');}renderer=r;return r;}).catch(e=>{rendererPromise=null;throw e;});
      return rendererPromise;
    }
    function stopActive(){
      cancelAnimationFrame(raf);raf=0;
      if(active){active.live.hidden=true;active.image.hidden=false;}
      active=null;renderer?.clear();
    }
    function failure(item,e){item.stage.dataset.previewState='error';item.image.hidden=false;item.live.hidden=true;item.note.textContent='FX PREVIEW UNAVAILABLE';item.note.hidden=false;console.warn('[INDEX FX preview]',item.tool.slug,e);}
    function schedule(){if(!busy&&!disposed)void pump();}
    async function pump(){
      if(busy||disposed)return;busy=true;
      try{
        while(!disposed){
          if(hover){
            const item=hover;
            if(active===item)break;
            stopActive();
            try{
              const m=await manifest(item.tool),r=await getRenderer();
              if(disposed||hover!==item)continue;
              r.select(m);active=item;item.note.hidden=true;item.live.hidden=false;item.image.hidden=true;
              const start=performance.now();last=0;
              const tick=now=>{
                if(disposed||hover!==item||active!==item)return;
                try{
                  if(now-last>=33){last=now;const t=(now-start)/1000;copyCanvas(r.draw(demonstration(m,defaults(m),t),t,true),item.live);}
                  raf=requestAnimationFrame(tick);
                }catch(e){failure(item,e);hover=null;stopActive();schedule();}
              };
              tick(start+34);
            }catch(e){failure(item,e);if(hover===item)hover=null;stopActive();continue;}
            break;
          }
          if(active)stopActive();
          const item=queue.shift();if(!item)break;
          if(item.ready)continue;
          try{
            const m=await manifest(item.tool),r=await getRenderer();
            if(disposed)break;
            if(hover){queue.unshift(item);continue;}
            r.select(m);
            let output;
            const state=demonstration(m,defaults(m),.65);
            for(let i=0;i<(m.effect.history?5:1);i++)output=r.draw(state,.65+i/30,true);
            item.image.src=output.toDataURL('image/webp',.86);
            item.note.hidden=true;item.ready=true;item.stage.dataset.previewState='ready';
            r.clear();
          }catch(e){renderer?.clear();failure(item,e);}
          // Yield between cards, including on slow devices.
          await new Promise(resolve=>requestAnimationFrame(resolve));
        }
      }finally{busy=false;if(!disposed&&!active&&(hover||queue.length))schedule();}
    }
    function attach(stage,tool,card,canHover){
      const image=document.createElement('img');image.className='fx-card-still';image.alt=tool.name+' FX preview on INDEX favicon';image.src='assets/branding/favicon.svg';
      const live=document.createElement('canvas');live.className='fx-card-live';live.hidden=true;live.setAttribute('aria-hidden','true');
      const note=stage.querySelector('.preview-placeholder');note.textContent='FX PREVIEW';note.hidden=true;
      stage.append(image,live);
      const item={stage,tool,image,live,note,ready:false};
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(e=>e.isIntersecting)){observer.disconnect();queue.push(item);schedule();}
      },{rootMargin:'200px 0px'});
      observer.observe(stage);
      if(canHover){
        card.addEventListener('pointerenter',e=>{if(e.pointerType==='touch'||document.hidden)return;hover=item;if(active&&active!==item)stopActive();schedule();});
        card.addEventListener('pointerleave',()=>{if(hover===item)hover=null;if(active===item)stopActive();schedule();});
      }
    }
    function pause(){hover=null;stopActive();schedule();}
    function dispose(){disposed=true;hover=null;queue.length=0;stopActive();renderer?.dispose();renderer=null;}
    return {attach,pause,dispose};
  }
  window.IndexFXPreview={manifest,defaults,create,copyCanvas,gallery};
})();
