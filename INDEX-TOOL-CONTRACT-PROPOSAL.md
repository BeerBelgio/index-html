# INDEX HTML — Native Tool Contract, prototype 0.1

**Status:** EXPERIMENTAL PROPOSAL / NOT BRIDGE-COMPATIBLE YET.

The INDEX Playground supports two manifest dialects:

- `window.SKETCH_TOOL`: existing unchanged legacy HTML files, `window.sketchDraw(state, hostContext)` and `window.sketchResize(w,h)`.
- `window.INDEX_TOOL`: experimental INDEX-native manifest, `window.indexDraw(state, hostContext)` and `window.indexResize(w,h)`.

Minimal proposed INDEX-native generator:

```html
<!doctype html><html><body style="margin:0;background:transparent">
<canvas id="sketch-canvas"></canvas>
<script>
window.INDEX_TOOL = {
  schemaVersion: 1,
  name: 'INDEX Native Prototype',
  role: 'generator',
  params: [{key:'radius',label:'Radius',min:10,max:180,step:1,default:80}],
  colors: [{key:'main_color',label:'Color',default:'#EC6B2D'}]
};
const canvas=document.querySelector('canvas');const ctx=canvas.getContext('2d');
window.indexResize=(w,h)=>{canvas.width=w;canvas.height=h};
window.indexDraw=(state,hostContext={})=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalAlpha=hostContext.colorOpacity?.main_color ?? 1;
  ctx.fillStyle=state.main_color;
  ctx.beginPath();ctx.arc(canvas.width/2,canvas.height/2,state.radius,0,2*Math.PI);ctx.fill();
  ctx.globalAlpha=1;
};
</script></body></html>
```

This is only a Playground prototype. The name, schema version, exact entrypoint names and role identifiers must be finalized before any Bridge integration. An `INDEX_TOOL` file is **not** currently guaranteed to work in Bridge. Legacy compatibility must not be removed before an adapter has been tested and accepted.

A fragment `effect` currently follows the Bridge's existing fragment shader uniforms (see `INDEX-CONTROL-PROTOCOL.md`). Compositor A/B routing and direct audio-native buffers/FFT inputs are not specified here.

Public creative families may include GENERATOR, FX, COMPOSITOR and AUDIO-DRIVEN. Runtime roles are independent; audio-driven can technically be generator, effect or compositor.

Each tool remains one standalone HTML file, with no required CDN/runtime dependencies. Hosted motion uses supplied `state.time`; do not start a second host-side animation clock.
