import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const generators=JSON.parse(fs.readFileSync('data/tools.json','utf8')), fx=JSON.parse(fs.readFileSync('data/fx.json','utf8'));
assert.equal(generators.tools.length,20);assert.equal(fx.tools.length,38);
assert.equal(generators.project.releaseBuild,'0.22.1');
for(const field of ['slug','toolId'])assert.equal(new Set([...generators.tools,...fx.tools].map(t=>t[field])).size,58);
let history=0,multipass=0;
for(const t of fx.tools){
 const html=fs.readFileSync(t.file,'utf8');
 const m=JSON.parse(html.match(/window\.INDEX_TOOL\s*=\s*(\{[\s\S]*?\n\});/)[1]);
 assert.equal(t.toolType,'effect');assert.equal(m.effect.moduleId,t.toolId);
 assert.equal(t.version,m.effect.moduleVersion);assert.deepEqual(t.capabilities,m.capabilities);
 assert.deepEqual(t.effect.provenance,m.effect.provenance);assert.ok(html.includes('MIT License'));
 assert.equal(t.effect.history,m.effect.history);assert.equal(t.effect.passCount,m.effect.passes.length);
 history+=Number(m.effect.history);multipass+=Number(m.effect.passes.length>1);
}
assert.equal(history,5);assert.equal(multipass,1);
const source=fx.project.sourceCommit;
assert.equal(execFileSync('git',['diff','--name-only',source,'HEAD','--','openmosh-fx','data/tools.json',...generators.tools.map(t=>t.file)],{encoding:'utf8'}).trim(),'');
console.log('PASS 20+38 catalogue identity, technical metadata, licenses, and unchanged upstream/generator files');
