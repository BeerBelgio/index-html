/* Optional UI presentation only: canonical state remains numeric. */
(() => {
  'use strict';
  function kind(p) {
    const type = String(p.type || '').toLowerCase();
    if (['toggle','checkbox'].includes(type) && Number(p.min)===0 && Number(p.max)===1 && Number(p.step)===1 && [0,1].includes(Number(p.default))) return 'toggle';
    if (['choice','select'].includes(type) && Array.isArray(p.options) && p.options.length) {
      const values = p.options.map(o=>Number(o && typeof o==='object'?o.value:o));
      const min=Number(p.min), max=Number(p.max), step=Number(p.step);
      const steps=Math.round((max-min)/step);
      if (step>0 && steps<=1000 && Math.abs(min+steps*step-max)<1e-5 && values.length===steps+1 &&
          new Set(values).size===values.length && values.includes(Number(p.default)) &&
          values.every(v=>Number.isFinite(v)&&v>=min&&v<=max&&Math.abs((v-min)/step-Math.round((v-min)/step))<1e-5)) return 'choice';
    }
    return 'slider';
  }
  function options(p) {return p.options.map(o=>o && typeof o==='object'?{value:Number(o.value),label:String(o.label??o.value)}:{value:Number(o),label:String(o)});}
  function coerce(p, value) {
    const n=Number(value), k=kind(p);
    if(k==='toggle') return [0,1].includes(n)?n:Number(p.default);
    if(k==='choice') return options(p).some(o=>o.value===n)?n:Number(p.default);
    return Math.min(Number(p.max),Math.max(Number(p.min),Number.isFinite(n)?n:Number(p.default)));
  }
  function create(p, value, onChange) {
    const k=kind(p); if(k==='slider') return null;
    const input=document.createElement(k==='toggle'?'input':'select');
    input.className='index-discrete-control'; input.setAttribute('aria-label',p.label||p.key);
    if(k==='toggle'){input.type='checkbox';input.setAttribute('role','switch');input.checked=coerce(p,value)===1;}
    else {for(const o of options(p)){const opt=document.createElement('option');opt.value=String(o.value);opt.textContent=o.label;input.append(opt);}input.value=String(coerce(p,value));}
    input.addEventListener('change',()=>onChange(k==='toggle'?(input.checked?1:0):Number(input.value)));
    return input;
  }
  window.IndexNumericControls={kind,coerce,create};
})();
