(() => {
  'use strict';

  const els = {
    picker: document.getElementById('tool-picker'),
    name: document.getElementById('tool-name'),
    shortCopy: document.getElementById('short-copy'),
    meta: document.getElementById('meta-row'),
    frame: document.getElementById('tool-frame'),
    previewStage: document.getElementById('preview-stage'),
    previewStatus: document.getElementById('preview-status'),
    controls: document.getElementById('controls'),
    reset: document.getElementById('reset-button'),
    description: document.getElementById('description'),
    behaviour: document.getElementById('behaviour'),
    mapping: document.getElementById('mapping-ideas'),
    lineage: document.getElementById('lineage'),
    development: document.getElementById('development'),
    standalone: document.getElementById('standalone-link'),
    download: document.getElementById('download-link'),
    fatal: document.getElementById('fatal-error')
  };

  const runtime = {
    data: null,
    tool: null,
    manifest: null,
    frameWindow: null,
    state: null,
    raf: 0,
    lastTime: 0,
    resizeObserver: null
  };

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  function setFatal(message) {
    els.fatal.textContent = message;
    els.fatal.hidden = false;
    els.previewStatus.textContent = 'ERROR';
    els.previewStatus.className = 'status error';
  }

  function clearFatal() {
    els.fatal.hidden = true;
    els.fatal.textContent = '';
  }

  function getRequestedSlug() {
    return new URLSearchParams(window.location.search).get('tool');
  }

  function setRequestedSlug(slug) {
    const url = new URL(window.location.href);
    url.searchParams.set('tool', slug);
    window.location.href = url.toString();
  }

  function pill(text, extraClass = '') {
    const span = document.createElement('span');
    span.className = `meta-pill ${extraClass}`.trim();
    span.textContent = text;
    return span;
  }

  function populatePicker(tools, selectedSlug) {
    els.picker.innerHTML = '';
    for (const tool of tools) {
      const option = document.createElement('option');
      option.value = tool.slug;
      option.textContent = tool.name;
      option.selected = tool.slug === selectedSlug;
      els.picker.appendChild(option);
    }
    els.picker.addEventListener('change', () => setRequestedSlug(els.picker.value));
  }

  function renderEditorial(tool) {
    document.title = `${tool.name} ${tool.version} — BeerBelgio Visual Lab`;
    els.name.textContent = tool.name;
    els.shortCopy.textContent = tool.copy?.short || '';
    els.description.textContent = tool.copy?.description || '';
    els.behaviour.textContent = tool.copy?.behaviour || '';

    els.meta.innerHTML = '';
    els.meta.appendChild(pill(tool.version));
    els.meta.appendChild(pill(tool.renderer));
    for (const tag of tool.conceptTags || []) els.meta.appendChild(pill(tag));
    for (const tag of tool.provenanceTags || []) els.meta.appendChild(pill(tag, 'provenance'));

    els.standalone.href = tool.file;
    els.download.href = tool.file;
    els.download.setAttribute('download', tool.file.split('/').pop());

    renderMapping(tool.mappingIdeas || []);
    renderLineage(tool.lineage || []);
    renderDevelopment(tool.development || {});
  }

  function renderMapping(items) {
    els.mapping.innerHTML = '';
    if (!items.length) {
      els.mapping.innerHTML = '<p class="muted">No mapping notes yet.</p>';
      return;
    }
    for (const item of items) {
      const div = document.createElement('div');
      div.className = 'mapping-item';
      div.innerHTML = `<strong>${escapeHtml(item.control)}</strong><p>${escapeHtml(item.text)}</p>`;
      els.mapping.appendChild(div);
    }
  }

  function renderLineage(items) {
    els.lineage.innerHTML = '';
    if (!items.length) {
      els.lineage.innerHTML = '<p class="muted">No external lineage recorded.</p>';
      return;
    }
    for (const item of items) {
      const div = document.createElement('div');
      div.className = 'lineage-item';
      const title = item.url
        ? `<a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.project)} ↗</a>`
        : escapeHtml(item.project);
      div.innerHTML = `
        <strong>${title}</strong>
        <p>${escapeHtml(item.text)}</p>
        <p class="muted">${escapeHtml(item.relation)} · ${escapeHtml(item.author || '')}${item.sourceLicence ? ` · ${escapeHtml(item.sourceLicence)}` : ''}</p>
      `;
      els.lineage.appendChild(div);
    }
  }

  function renderDevelopment(development) {
    els.development.innerHTML = '';
    const blocks = [];
    if (development.notes) blocks.push(['Notes', `<p>${escapeHtml(development.notes)}</p>`]);
    if (development.limitations) blocks.push(['Known limitations', `<p>${escapeHtml(development.limitations)}</p>`]);
    if (Array.isArray(development.nextIdeas) && development.nextIdeas.length) {
      const list = development.nextIdeas.map((idea) => `<li>${escapeHtml(idea)}</li>`).join('');
      blocks.push(['Next ideas', `<ul>${list}</ul>`]);
    }
    if (!blocks.length) {
      els.development.innerHTML = '<p class="muted">No development notes yet.</p>';
      return;
    }
    for (const [label, body] of blocks) {
      const div = document.createElement('div');
      div.className = 'development-block';
      div.innerHTML = `<strong>${label}</strong>${body}`;
      els.development.appendChild(div);
    }
  }

  function precisionForStep(step) {
    const s = String(step ?? 1);
    return s.includes('.') ? s.split('.')[1].length : 0;
  }

  function numericValue(value, param) {
    const number = Number(value);
    if (!Number.isFinite(number)) return Number(param.default);
    return Math.min(Number(param.max), Math.max(Number(param.min), number));
  }

  function createAudioPill() {
    const span = document.createElement('span');
    span.className = 'audio-pill';
    span.textContent = 'Audio Sync';
    return span;
  }

  function createControlHeader(item, isAudio) {
    const top = document.createElement('div');
    top.className = 'control-top';

    const label = document.createElement('span');
    label.className = 'control-label';
    label.textContent = item.label;

    const meta = document.createElement('span');
    meta.className = 'control-meta';
    if (isAudio) meta.appendChild(createAudioPill());

    const key = document.createElement('span');
    key.className = 'control-key';
    key.textContent = item.key;
    meta.appendChild(key);

    top.append(label, meta);
    return top;
  }

  function renderControls(manifest) {
    const audioKeys = new Set(Array.isArray(manifest.audio) ? manifest.audio : []);
    els.controls.innerHTML = '';

    for (const param of manifest.params || []) {
      const row = document.createElement('div');
      row.className = 'control-row';
      row.appendChild(createControlHeader(param, audioKeys.has(param.key)));

      const wrap = document.createElement('div');
      wrap.className = 'number-control';

      const range = document.createElement('input');
      range.type = 'range';
      range.min = param.min;
      range.max = param.max;
      range.step = param.step;
      range.value = runtime.state[param.key];
      range.setAttribute('aria-label', param.label);

      const number = document.createElement('input');
      number.type = 'number';
      number.className = 'number-input';
      number.min = param.min;
      number.max = param.max;
      number.step = param.step;
      number.value = runtime.state[param.key];
      number.setAttribute('aria-label', `${param.label} numeric value`);

      const precision = precisionForStep(param.step);
      const update = (raw, source) => {
        const value = numericValue(raw, param);
        runtime.state[param.key] = value;
        range.value = value;
        if (source !== 'number' || document.activeElement !== number) {
          number.value = precision ? value.toFixed(precision) : String(Math.round(value));
        }
      };

      range.addEventListener('input', () => update(range.value, 'range'));
      number.addEventListener('input', () => {
        const parsed = Number(number.value);
        if (Number.isFinite(parsed)) {
          runtime.state[param.key] = numericValue(parsed, param);
          range.value = runtime.state[param.key];
        }
      });
      number.addEventListener('change', () => update(number.value, 'number'));
      number.addEventListener('blur', () => update(number.value, 'range'));

      wrap.append(range, number);
      row.appendChild(wrap);
      els.controls.appendChild(row);
    }

    for (const color of manifest.colors || []) {
      const row = document.createElement('div');
      row.className = 'control-row';
      row.appendChild(createControlHeader(color, audioKeys.has(color.key)));

      const wrap = document.createElement('div');
      wrap.className = 'color-control';

      const picker = document.createElement('input');
      picker.type = 'color';
      picker.value = runtime.state[color.key];
      picker.setAttribute('aria-label', color.label);

      const hex = document.createElement('input');
      hex.type = 'text';
      hex.className = 'hex-input';
      hex.value = runtime.state[color.key].toUpperCase();
      hex.maxLength = 7;
      hex.setAttribute('aria-label', `${color.label} hex value`);

      const applyColor = (value) => {
        if (!/^#[0-9a-f]{6}$/i.test(value)) return false;
        const normalized = value.toUpperCase();
        runtime.state[color.key] = normalized;
        picker.value = normalized;
        hex.value = normalized;
        return true;
      };

      picker.addEventListener('input', () => applyColor(picker.value));
      hex.addEventListener('change', () => {
        if (!applyColor(hex.value.trim())) hex.value = runtime.state[color.key];
      });
      hex.addEventListener('blur', () => {
        if (!applyColor(hex.value.trim())) hex.value = runtime.state[color.key];
      });

      wrap.append(picker, hex);
      row.appendChild(wrap);
      els.controls.appendChild(row);
    }

    els.reset.disabled = false;
  }

  function stateFromManifest(manifest) {
    const state = { time: 0 };
    for (const item of manifest.params || []) state[item.key] = item.default;
    for (const item of manifest.colors || []) state[item.key] = item.default;
    return state;
  }

  function resizeTool() {
    if (!runtime.frameWindow || typeof runtime.frameWindow.sketchResize !== 'function') return;
    const rect = els.previewStage.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    try {
      const doc = els.frame.contentDocument;
      const canvas = doc && doc.getElementById('sketch-canvas');
      if (canvas) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.maxWidth = 'none';
        canvas.style.maxHeight = 'none';
      }
      runtime.frameWindow.sketchResize(
        Math.max(1, Math.floor(width * dpr)),
        Math.max(1, Math.floor(height * dpr))
      );
    } catch (error) {
      setFatal(`Preview resize failed: ${error.message}`);
    }
  }

  function stopRenderLoop() {
    if (runtime.raf) cancelAnimationFrame(runtime.raf);
    runtime.raf = 0;
    runtime.lastTime = 0;
  }

  function startRenderLoop() {
    stopRenderLoop();
    const tick = (now) => {
      if (!runtime.frameWindow || !runtime.state) return;
      if (!runtime.lastTime) runtime.lastTime = now;
      const dt = Math.min(0.05, Math.max(0, (now - runtime.lastTime) / 1000));
      runtime.lastTime = now;
      runtime.state.time += dt;

      try {
        runtime.frameWindow.sketchDraw(runtime.state);
      } catch (error) {
        stopRenderLoop();
        setFatal(`Tool render failed: ${error.message}`);
        return;
      }
      runtime.raf = requestAnimationFrame(tick);
    };
    runtime.raf = requestAnimationFrame(tick);
  }

  function resetState() {
    if (!runtime.manifest) return;
    runtime.state = stateFromManifest(runtime.manifest);
    renderControls(runtime.manifest);
    resizeTool();
  }

  function handleFrameLoaded() {
    clearFatal();
    try {
      const win = els.frame.contentWindow;
      const manifest = win.SKETCH_TOOL;
      if (!manifest || !Array.isArray(manifest.params) || !Array.isArray(manifest.colors)) {
        throw new Error('SKETCH_TOOL manifest was not found or is invalid.');
      }
      if (typeof win.sketchResize !== 'function' || typeof win.sketchDraw !== 'function') {
        throw new Error('sketchResize() or sketchDraw() is missing.');
      }

      runtime.frameWindow = win;
      runtime.manifest = manifest;
      runtime.state = stateFromManifest(manifest);

      renderControls(manifest);
      resizeTool();
      startRenderLoop();

      els.previewStatus.textContent = 'LIVE';
      els.previewStatus.className = 'status ready';
    } catch (error) {
      setFatal(`Could not initialise this tool: ${error.message}`);
    }
  }

  function loadTool(tool) {
    runtime.tool = tool;
    runtime.manifest = null;
    runtime.frameWindow = null;
    runtime.state = null;
    stopRenderLoop();
    els.reset.disabled = true;
    els.controls.innerHTML = '<p class="muted">Waiting for tool manifest…</p>';
    els.previewStatus.textContent = 'LOADING';
    els.previewStatus.className = 'status';

    renderEditorial(tool);
    els.frame.title = `${tool.name} live preview`;
    els.frame.src = tool.file;
  }

  async function boot() {
    clearFatal();
    try {
      const response = await fetch('data/tools.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`tools.json returned HTTP ${response.status}.`);
      runtime.data = await response.json();

      const tools = Array.isArray(runtime.data.tools) ? runtime.data.tools : [];
      if (!tools.length) throw new Error('No tools are defined in data/tools.json.');

      const requested = getRequestedSlug();
      const selected = tools.find((tool) => tool.slug === requested) || tools[0];

      populatePicker(tools, selected.slug);
      if (requested !== selected.slug) {
        const url = new URL(window.location.href);
        url.searchParams.set('tool', selected.slug);
        window.history.replaceState({}, '', url);
      }

      els.frame.addEventListener('load', handleFrameLoaded);
      els.reset.addEventListener('click', resetState);

      runtime.resizeObserver = new ResizeObserver(() => resizeTool());
      runtime.resizeObserver.observe(els.previewStage);

      loadTool(selected);
    } catch (error) {
      setFatal(`Visual Lab could not start: ${error.message}`);
    }
  }

  window.addEventListener('beforeunload', stopRenderLoop);
  boot();
})();
