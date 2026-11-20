/* INDEX Playground WebGL2 Gate A LAB. Opt-in only; no generator/FX contract changes. */
(function () {
  'use strict';
  const VERT = `#version 300 es
precision highp float;
out vec2 vUV;
void main() {
  vec2 p = vec2((gl_VertexID == 1) ? 3.0 : -1.0, (gl_VertexID == 2) ? 3.0 : -1.0);
  vUV = (p + 1.0) * 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;
  const COMPOSE = `#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uLower;
uniform sampler2D uUpper;
uniform float uOpacity;
uniform int uBlend;
uniform int uUpperPremultiplied;
out vec4 fragColor;
void main() {
  vec4 below = texture(uLower, vUV);
  vec4 above = texture(uUpper, vUV);
  // ImageBitmap inputs arrive premultiplied on Chromium; intermediate FX textures do not.
  if (uUpperPremultiplied == 1 && above.a > 0.0) above.rgb = clamp(above.rgb / above.a, 0.0, 1.0);
  float a = clamp(above.a * uOpacity, 0.0, 1.0);
  float b = clamp(below.a, 0.0, 1.0);
  float outA;
  vec3 premul;
  if (uBlend == 1) {
    // Canvas2D lighter/add: additive premultiplied channels and alpha.
    premul = min(vec3(1.0), below.rgb * b + above.rgb * a);
    outA = min(1.0, a + b);
  } else {
    vec3 mixed = above.rgb;
    if (uBlend == 2) mixed = below.rgb * above.rgb;
    if (uBlend == 3) mixed = 1.0 - (1.0 - below.rgb) * (1.0 - above.rgb);
    premul = (1.0 - a) * below.rgb * b
           + (1.0 - b) * above.rgb * a
           + a * b * mixed;
    outA = a + b * (1.0 - a);
  }
  fragColor = outA > 0.0 ? vec4(premul / outA, outA) : vec4(0.0);
}`;
  const COPY = `#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uInput;
out vec4 fragColor;
void main() { fragColor = texture(uInput, vUV); }
`;
  const RELAY = `#version 300 es
precision highp float;
in vec2 vUV;
uniform sampler2D uInput;
uniform vec2 uResolution;
uniform float uShift;
uniform float uStrength;
out vec4 fragColor;
void main() {
  vec4 original = texture(uInput, vUV);
  vec2 delta = vec2(clamp(uShift, 0.0, 24.0) / max(uResolution.x, 1.0), 0.0);
  vec4 red = texture(uInput, clamp(vUV + delta, vec2(0.0), vec2(1.0)));
  vec4 blue = texture(uInput, clamp(vUV - delta, vec2(0.0), vec2(1.0)));
  // Original stateless channel displacement, not Bridge source code or a parity claim.
  vec3 shifted = vec3(red.r, original.g, blue.b);
  fragColor = vec4(mix(original.rgb, shifted, clamp(uStrength, 0.0, 1.0)), original.a);
}`;

  function manifest() {
    return {
      name: 'Channel Relay [WebGL2 LAB]', role: 'effect-webgl2',
      params: [
        {key: 'shift_px', label: 'Channel shift (px)', min: 0, max: 24, step: 1, default: 8},
        {key: 'strength', label: 'Strength', min: 0, max: 1, step: 0.01, default: 0.8}
      ],
      colors: [],
      // Local lab marker, NOT part of INDEX_TOOL generator v1.0.
      labFx: {moduleId: 'index-lab-channel-relay', apiVersion: 'gate-a-prototype',
        origin: 'original synthetic laboratory shader', history: false}
    };
  }

  function create({surface, legacyCanvas, emptyElement}) {
    const canvas = document.createElement('canvas');
    canvas.id = 'pg-gpu-lab';
    canvas.setAttribute('aria-label', 'Experimental WebGL2 composite');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:none;';
    surface.insertBefore(canvas, emptyElement);
    let gl;
    try {
      gl = canvas.getContext('webgl2', {
        alpha: true, premultipliedAlpha: false, antialias: false,
        depth: false, stencil: false, preserveDrawingBuffer: true
      });
      if (!gl) throw new Error('WebGL2 is not available on this browser/device.');
    } catch (error) { canvas.remove(); throw error; }
    let destroyed = false;
    const resources = [];
    let width = 0, height = 0, pair = [], scratch = null, source = null;
    let compileProgram, composeProgram, copyProgram, relayProgram, vao;
    const MAX_DIM = 2048;

    function track(obj, remove) { resources.push(() => remove(obj)); return obj; }
    function shader(type, code) {
      const s = gl.createShader(type);
      if (!s) throw new Error('WebGL2 shader allocation failed.');
      gl.shaderSource(s, code);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(s) || 'unknown shader compilation error';
        gl.deleteShader(s); throw new Error('WebGL2 GLSL compile: ' + log);
      }
      return s;
    }
    function program(fragment) {
      const vert = shader(gl.VERTEX_SHADER, VERT);
      let frag;
      try { frag = shader(gl.FRAGMENT_SHADER, fragment); }
      catch (e) { gl.deleteShader(vert); throw e; }
      const p = gl.createProgram();
      gl.attachShader(p, vert); gl.attachShader(p, frag); gl.linkProgram(p);
      gl.deleteShader(vert); gl.deleteShader(frag);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(p); gl.deleteProgram(p);
        throw new Error('WebGL2 program link: ' + log);
      }
      return track(p, x => gl.deleteProgram(x));
    }
    function texture() {
      const tex = track(gl.createTexture(), x => gl.deleteTexture(x));
      if (!tex) throw new Error('Texture allocation failed.');
      gl.bindTexture(gl.TEXTURE_2D, tex);
      for (const [param, value] of [
        [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
        [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]
      ]) gl.texParameteri(gl.TEXTURE_2D, param, value);
      return tex;
    }
    function target() {
      const tex = texture(), fbo = track(gl.createFramebuffer(), x => gl.deleteFramebuffer(x));
      if (!fbo) throw new Error('Framebuffer allocation failed.');
      return {tex, fbo};
    }
    function allocate(t) {
      gl.bindTexture(gl.TEXTURE_2D, t.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t.tex, 0);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
        throw new Error('WebGL2 framebuffer incomplete.');
    }
    function resize(w, h) {
      const scale = Math.min(1, MAX_DIM / Math.max(w, h));
      const nextW = Math.max(1, Math.round(w * scale));
      const nextH = Math.max(1, Math.round(h * scale));
      if (nextW === width && nextH === height) return;
      width = nextW; height = nextH;
      canvas.width = width; canvas.height = height;
      for (const t of [...pair, scratch]) allocate(t);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    function bindTexture(unit, tex, name, prog) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      const location = gl.getUniformLocation(prog, name);
      if (location !== null) gl.uniform1i(location, unit);
    }
    function draw(targetFbo) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, targetFbo);
      gl.viewport(0, 0, width, height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function use(p) { gl.useProgram(p); gl.bindVertexArray(vao); }
    function upload(bitmap) {
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, source);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      return source;
    }

    function render(layers, originalWidth, originalHeight) {
      if (destroyed || gl.isContextLost()) throw new Error('WebGL2 context unavailable.');
      if (!originalWidth || !originalHeight) return false;
      resize(originalWidth, originalHeight);
      gl.disable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.SCISSOR_TEST);
      gl.bindFramebuffer(gl.FRAMEBUFFER, pair[0].fbo);
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      let read = 0, wrote = false;
      for (const layer of layers) {
        if (!layer.visible || !layer.manifest || layer.loading || layer.opacity <= 0) continue;
        let upper = null, isBitmap = false;
        if (layer.role === 'generator') {
          if (!layer.bitmap) continue;
          upper = upload(layer.bitmap); isBitmap = true;
        } else if (layer.role === 'effect-webgl2') {
          if (layer.manifest.labFx?.moduleId !== 'index-lab-channel-relay')
            throw new Error('Unsupported WebGL2 lab FX module.');
          use(relayProgram);
          bindTexture(0, pair[read].tex, 'uInput', relayProgram);
          const res = gl.getUniformLocation(relayProgram, 'uResolution');
          if (res !== null) gl.uniform2f(res, width, height);
          const shift = gl.getUniformLocation(relayProgram, 'uShift');
          if (shift !== null) gl.uniform1f(shift, Number(layer.state.shift_px) || 0);
          const strength = gl.getUniformLocation(relayProgram, 'uStrength');
          if (strength !== null) gl.uniform1f(strength, Number(layer.state.strength) || 0);
          draw(scratch.fbo);
          upper = scratch.tex;
        } else {
          throw new Error('Unsupported fragment-webgl1 FX in WebGL2 Lab. Use normal Playground.');
        }
        use(composeProgram);
        bindTexture(0, pair[read].tex, 'uLower', composeProgram);
        bindTexture(1, upper, 'uUpper', composeProgram);
        const alpha = gl.getUniformLocation(composeProgram, 'uOpacity');
        if (alpha !== null) gl.uniform1f(alpha, layer.opacity);
        const mode = {normal: 0, add: 1, multiply: 2, screen: 3}[layer.blend];
        if (mode === undefined) throw new Error('Unsupported blend mode: ' + layer.blend);
        const blend = gl.getUniformLocation(composeProgram, 'uBlend');
        if (blend !== null) gl.uniform1i(blend, mode);
        const premul = gl.getUniformLocation(composeProgram, 'uUpperPremultiplied');
        if (premul !== null) gl.uniform1i(premul, isBitmap ? 1 : 0);
        const next = 1 - read;
        draw(pair[next].fbo);
        read = next; wrote = true;
      }
      use(copyProgram);
      bindTexture(0, pair[read].tex, 'uInput', copyProgram);
      draw(null);
      const error = gl.getError();
      if (error !== gl.NO_ERROR) throw new Error('WebGL2 rendering error 0x' + error.toString(16));
      canvas.style.display = '';
      legacyCanvas.style.visibility = 'hidden';
      return wrote;
    }

    function fallback() {
      canvas.style.display = 'none';
      legacyCanvas.style.visibility = '';
    }
    function dispose() {
      if (destroyed) return;
      destroyed = true;
      fallback();
      for (const release of resources.reverse()) release();
      canvas.remove();
    }
    function contextLost(e) {
      e.preventDefault();
      fallback();
    }
    canvas.addEventListener('webglcontextlost', contextLost, false);
    try {
      vao = track(gl.createVertexArray(), x => gl.deleteVertexArray(x));
      gl.bindVertexArray(vao);
      composeProgram = program(COMPOSE);
      copyProgram = program(COPY);
      relayProgram = program(RELAY);
      pair = [target(), target()];
      scratch = target();
      source = texture();
    } catch (e) { dispose(); throw e; }

    return {
      render, fallback, dispose,
      getStats: () => ({
        width, height, maxDimension: MAX_DIM, textureBytesEstimate: width * height * 4 * 4,
        contexts: 1, mode: 'WebGL2 lab — not production validated'
      })
    };
  }

  window.IndexWebGL2Lab = {create, channelRelayManifest: manifest};
})();
