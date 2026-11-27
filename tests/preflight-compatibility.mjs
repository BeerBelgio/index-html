import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context={window:{}};
vm.runInNewContext(fs.readFileSync('assets/js/playground-import-preflight.js','utf8'),context);
const {assess}=context.window.IndexImportPreflight;
const native={native:true,hasDraw:true,hasResize:true};
const generator=()=>({
 schemaVersion:1,name:'Fixture Generator',role:'generator',
 capabilities:{requires:{renderer:'canvas2d',visualInput:'none',audioInput:'none'},supports:{unknownOptional:true}},
 params:[{key:'size',min:0,max:10,step:1,default:5}],colors:[{key:'ink',default:'#ff0000'}]
});
const gpuFX=()=>({
 schemaVersion:1,name:'Fixture WebGL2 FX',role:'effect',
 capabilities:{requires:{renderer:'fragment-webgl2',visualInput:'lower-composite',audioInput:'none'}},
 params:[],colors:[],effect:{apiVersion:2,type:'fragment-webgl2',history:true,
  passes:[{fragment:'#version 300 es\nvoid main(){}'}]}
});
function expect(name,result,expected,reason){
 assert.equal(result.status,expected,name+' expected '+expected+' found '+result.status);
 if(reason)assert.match(result.reason,reason,name);
 console.log('PASS '+name+' '+result.status);
}
expect('native generator',assess(generator(),native),'SUPPORTED');
expect('optional future metadata ignored',assess({...generator(),newPresentation:{title:'future'}},native),'SUPPORTED');
expect('native schema incompatible',assess({...generator(),schemaVersion:7},native),'UNSUPPORTED',/schemaVersion/);
let a=generator();a.params[0].type='checkbox';a.params[0].min=0;a.params[0].max=1;a.params[0].default=1;
expect('numeric checkbox 0/1 fallback',assess(a,native),'SUPPORTED_WITH_FALLBACK',/0\/1 slider/);
a.params[0].type='toggle';expect('numeric toggle fallback',assess(a,native),'SUPPORTED_WITH_FALLBACK');
a.params[0].max=10;expect('invalid 0/1 toggle rejected',assess(a,native),'UNSUPPORTED',/valid numeric 0\/1/);
a=generator();a.params[0].type='select';a.params[0].min=0;a.params[0].max=2;a.params[0].default=1;a.params[0].options=[{value:0,label:'A'},{value:1,label:'B'},{value:2,label:'C'}];
expect('numeric stepped select fallback',assess(a,native),'SUPPORTED_WITH_FALLBACK',/stepped slider/);
a.params[0].options=[0,2];expect('select with missing grid value rejected',assess(a,native),'UNSUPPORTED',/cannot be represented/);
a.params[0].options=['red','blue'];expect('nonnumeric select rejected',assess(a,native),'UNSUPPORTED',/nonnumeric/);
a=generator();a.params[0].type='future-knob';
expect('unknown descriptive type uses numeric slider',assess(a,native),'SUPPORTED_WITH_FALLBACK',/future-knob/);
a=generator();a.capabilities.requires.futureGpuMode=true;
expect('unknown required capability rejected',assess(a,native),'UNSUPPORTED',/futureGpuMode/);
a=generator();a.capabilities.requires.audioInput='fft';
expect('direct audio unsupported',assess(a,native),'UNSUPPORTED',/direct audio/);
a=generator();a.capabilities.requires.renderer='webgl2';
expect('unknown generator renderer rejected',assess(a,native),'UNSUPPORTED',/renderer/);
expect('GPU FX v2 supported',assess(gpuFX(),{native:true}),'SUPPORTED');
expect('GPU FX rejected in Canvas2D mode',assess(gpuFX(),{native:true,forceClassic:true}),'UNSUPPORTED',/Canvas2D/);
a=gpuFX();a.effect.apiVersion=3;
expect('future FX API rejected',assess(a,{native:true}),'UNSUPPORTED',/API version 2/);
a=gpuFX();a.effect.history='auto';
expect('missing boolean history rejected',assess(a,{native:true}),'UNSUPPORTED',/history/);
a=gpuFX();a.effect.passes=Array.from({length:4},()=>({fragment:'#version 300 es\nvoid main(){}'}));
expect('too many FX passes rejected',assess(a,{native:true}),'UNSUPPORTED',/1–3/);
a=gpuFX();a.capabilities.requires.visualInput='two-sources';
expect('unsupported composite input rejected',assess(a,{native:true}),'UNSUPPORTED',/lower-composite/);
a=generator();a.role='compositor';
expect('unavailable role rejected',assess(a,native),'UNSUPPORTED',/compositor/);
console.log('PASS all compatibility preflight tests');

let discrete=generator();discrete.params[0]={key:'switch',min:0,max:1,step:1,default:0,type:'toggle'};
expect('native toggle',assess(discrete,{...native,nativeControls:true}),'SUPPORTED');
discrete.params[0]={key:'mode',min:0,max:1,step:1,default:0,type:'choice',options:[{value:0,label:'A'},{value:1,label:'B'}]};
expect('native numeric choice',assess(discrete,{...native,nativeControls:true}),'SUPPORTED');
expect('legacy numeric choice fallback',assess(discrete,native),'SUPPORTED_WITH_FALLBACK');
delete discrete.params[0].options;expect('choice missing options rejected',assess(discrete,native),'UNSUPPORTED');
