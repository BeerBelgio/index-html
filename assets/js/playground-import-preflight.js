/* INDEX Playground import capability gate — provisional host policy, not generator contract v1.0. */
(function () {
  'use strict';
  const SUPPORTED = 'SUPPORTED', FALLBACK = 'SUPPORTED_WITH_FALLBACK', UNSUPPORTED = 'UNSUPPORTED';
  const KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;
  const DOCUMENTATION = 'https://github.com/BeerBelgio/index-html/blob/main/docs/labs/FX-WEBGL2-PROVISIONAL-API.md';
  function assess(raw, env = {}) {
    const m = raw && typeof raw === 'object' ? raw : {};
    const name = (typeof m.name === 'string' && m.name.trim()) || env.filename || 'Unnamed HTML module';
    const reject = (reason, alternative = 'Read the compatibility documentation or contact BeerBelgio.') =>
      ({status: UNSUPPORTED, name, reason, alternative, documentation: DOCUMENTATION, warnings: []});
    const warnings = [];
    if (env.native && m.schemaVersion !== 1) return reject('Unsupported INDEX_TOOL schemaVersion ' + String(m.schemaVersion) + '; this Playground supports generator schema v1.');
    if (!Array.isArray(m.params) || !Array.isArray(m.colors)) return reject('Manifest must contain params[] and colors[] arrays.');
    const keys = new Set();
    for (const item of [...m.params, ...m.colors]) {
      if (!item || typeof item.key !== 'string' || !KEY.test(item.key) || item.key === 'time' || keys.has(item.key))
        return reject('Invalid or duplicate control key: ' + String(item?.key));
      keys.add(item.key);
    }
    for (const p of m.params) {
      const min = Number(p.min), max = Number(p.max), step = Number(p.step), def = Number(p.default);
      if (![min,max,step,def].every(Number.isFinite) || step <= 0 || min > max || def < min || def > max)
        return reject('Parameter ' + p.key + ' cannot be represented as a bounded numeric slider.');
      if (Math.abs((def-min)/step - Math.round((def-min)/step)) > 1e-5)
        return reject('Parameter ' + p.key + ' default is off the numeric step grid.');
      const type = typeof p.type === 'string' ? p.type.toLowerCase() : 'slider';
      if (type === 'toggle' || type === 'checkbox') {
        if (min !== 0 || max !== 1 || step !== 1 || ![0,1].includes(def))
          return reject(p.key + ' declares ' + type + ' but is not a valid numeric 0/1 control.');
        warnings.push(p.key + ': ' + type + ' displayed as 0/1 slider.');
      } else if (type === 'select' || p.options !== undefined) {
        if (!Array.isArray(p.options) || !p.options.length)
          return reject(p.key + ' requires numeric select options but has no valid options array.');
        const options = p.options.map(o => Number(typeof o === 'object' && o !== null ? o.value : o));
        if (options.some(n => !Number.isFinite(n)) || new Set(options).size !== options.length)
          return reject(p.key + ' has nonnumeric or duplicate select options.');
        const steps = Math.round((max-min)/step);
        if (steps > 1000 || Math.abs(min+steps*step-max) > 1e-5 || options.length !== steps+1 ||
            options.some(n => n < min || n > max || Math.abs((n-min)/step-Math.round((n-min)/step))>1e-5) ||
            !options.includes(def))
          return reject(p.key + ' select options cannot be represented without extra invalid slider values.');
        warnings.push(p.key + ': numeric select displayed as stepped slider.');
      } else if (!['slider','range','number'].includes(type)) {
        // Unknown type is descriptive; the numeric bounds remain canonical.
        warnings.push(p.key + ': unknown control type "' + String(p.type) + '" displayed as numeric slider.');
      }
    }
    for (const c of m.colors) if (typeof c.default !== 'string' || !/^#[0-9A-F]{6}$/i.test(c.default))
      return reject('Invalid HEX color default for ' + c.key + '.');
    const role = m.index?.role || m.role || (env.native ? null : 'generator');
    if (!['generator','effect'].includes(role)) return reject('Unsupported tool role: ' + String(role) + '. A/B compositors require a future contract.');
    const requires = m.capabilities?.requires;
    if (env.native && (!requires || typeof requires !== 'object'))
      return reject('Native INDEX_TOOL requires capabilities.requires.');
    for (const key of Object.keys(requires || {})) {
      if (!['renderer','visualInput','audioInput'].includes(key))
        return reject('Unknown mandatory capability: capabilities.requires.' + key + '.');
    }
    const renderer = requires?.renderer;
    const visualInput = requires?.visualInput, audioInput = requires?.audioInput;
    const isGpuFx = role === 'effect' && renderer === 'fragment-webgl2';
    if (role === 'generator') {
      if (requires && !['canvas2d','webgl1'].includes(renderer))
        return reject('Unsupported generator renderer: ' + String(renderer) + '.');
      if (requires && (visualInput !== 'none' || audioInput !== 'none'))
        return reject('Generator requires unavailable visual or direct audio input.');
      if (!env.hasDraw || !env.hasResize)
        return reject('Generator is missing its draw/resize entrypoints.');
    } else if (isGpuFx) {
      if (env.forceClassic)
        return reject('This FX needs WebGL2 but the Playground is forced to Canvas2D.', 'Open the normal Playground URL in a WebGL2-capable browser.');
      if (visualInput !== 'lower-composite' || audioInput !== 'none')
        return reject('WebGL2 FX requires lower-composite image input and no direct audio input.');
      if (m.effect?.apiVersion !== 2 || m.effect?.type !== 'fragment-webgl2')
        return reject('FX requires provisional fragment-webgl2 API version 2.');
      if (typeof m.effect.history !== 'boolean')
        return reject('FX must explicitly declare history: true or false.');
      if (!Array.isArray(m.effect.passes) || m.effect.passes.length < 1 || m.effect.passes.length > 3)
        return reject('FX requires 1–3 fragment shader passes.');
      if (!m.effect.passes.every(p => typeof p.fragment === 'string' && p.fragment.includes('#version 300 es')))
        return reject('FX shaders must use GLSL ES 3.00.');
    } else {
      if (requires && renderer !== 'fragment-webgl1' && renderer !== 'webgl1')
        return reject('Unsupported FX renderer: ' + String(renderer) + '.');
      if (audioInput && audioInput !== 'none') return reject('Direct FX audio input is not supported.');
      if (visualInput && !['lower-composite','none'].includes(visualInput))
        return reject('Unsupported FX visual input: ' + String(visualInput) + '.');
      if (m.effect?.type !== 'fragment' || typeof m.effect.fragment !== 'string')
        return reject('Legacy FX requires a GLSL fragment shader.');
      if (env.otherGpuFX) return reject('Legacy WebGL1 FX cannot coexist with another active WebGL2 FX.', 'Use a separate Playground session or remove the other WebGL2 FX.');
    }
    return {status:warnings.length ? FALLBACK : SUPPORTED, name,
      reason:warnings.length ? warnings.join(' ') : 'Compatible with this Playground.',
      alternative:null, documentation:DOCUMENTATION, warnings, role: isGpuFx ? 'effect-webgl2' : role};
  }
  window.IndexImportPreflight = {assess, SUPPORTED, FALLBACK, UNSUPPORTED};
})();
