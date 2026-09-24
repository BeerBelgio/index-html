(() => {
  'use strict';

  const els = {
    standardPage: document.getElementById('standard-page'),
    standalonePage: document.getElementById('standalone-page'),
    standaloneStage: document.getElementById('standalone-stage'),
    switcher: document.getElementById('tool-switcher'),
    pickerButton: document.getElementById('tool-picker-button'),
    pickerCurrent: document.getElementById('tool-picker-current'),
    pickerMenu: document.getElementById('tool-picker-menu'),
    name: document.getElementById('tool-name'),
    version: document.getElementById('tool-version'),
    shortCopy: document.getElementById('short-copy'),
    meta: document.getElementById('meta-row'),
    frame: document.getElementById('tool-frame'),
    previewStage: document.getElementById('preview-stage'),
    controls: document.getElementById('controls'),
    colors: document.getElementById('colors'),
    reset: document.getElementById('reset-button'),
    description: document.getElementById('description'),
    implementation: document.getElementById('implementation'),
    parameters: document.getElementById('parameters'),
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
    requestedState: null,
    raf: 0,
    lastTime: 0,
    resizeObserver: null,
    standaloneMode: new URLSearchParams(window.location.search).get('view') === 'standalone'
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
  }

  function clearFatal() {
    els.fatal.hidden = true;
    els.fatal.textContent = '';
  }

  function getRequestedSlug() {
    return new URLSearchParams(window.location.search).get('tool');
  }

  function readRequestedState() {
    const raw = new URLSearchParams(window.location.search).get('state');
    if (!raw) return null;
    try {
      const value = JSON.parse(raw);
      return value && typeof value === 'object' ? value : null;
    } catch (_) {
      return null;
    }
  }

  function setPickerOpen(open) {
    if (!els.pickerButton || !els.pickerMenu) return;
    els.pickerButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    els.pickerMenu.hidden = !open;
  }

  function updatePickerSelection(slug) {
    if (!runtime.data || !els.pickerCurrent || !els.pickerMenu) return;
    const tool = runtime.data.tools.find((item) => item.slug === slug);
    if (tool) els.pickerCurrent.textContent = tool.name;
    for (const item of els.pickerMenu.querySelectorAll('[data-tool-slug]')) {
      const current = item.dataset.toolSlug === slug;
      item.classList.toggle('is-current', current);
      if (current) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    }
  }

  function setRequestedSlug(slug) {
    const url = new URL(window.location.href);
    url.searchParams.set('tool', slug);
    url.searchParams.delete('view');
    url.searchParams.delete('state');
    window.history.pushState({}, '', url);
    const selected = runtime.data.tools.find((tool) => tool.slug === slug);
    if (selected) loadTool(selected);
  }

  function pill(text) {
    const span = document.createElement('span');
    span.className = 'meta-pill';
    span.textContent = text;
    return span;
  }

  function populatePicker(tools, selectedSlug) {
    if (!els.pickerMenu || !els.pickerButton) return;
    els.pickerMenu.innerHTML = '';

    for (const tool of tools) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tool-picker-item';
      button.dataset.toolSlug = tool.slug;
      button.setAttribute('role', 'menuitem');
      button.textContent = tool.name;
      button.addEventListener('click', () => {
        setPickerOpen(false);
        setRequestedSlug(tool.slug);
      });
      els.pickerMenu.appendChild(button);
    }

    els.pickerButton.addEventListener('click', () => {
      const open = els.pickerButton.getAttribute('aria-expanded') === 'true';
      setPickerOpen(!open);
    });

    document.addEventListener('click', (event) => {
      if (!els.switcher || els.switcher.contains(event.target)) return;
      setPickerOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      setPickerOpen(false);
      els.pickerButton.focus();
    });

    updatePickerSelection(selectedSlug);
  }

  function linkifyPublicText(item) {
    let text = escapeHtml(item.publicText || '');
    const replacements = [];
    if (item.specificReference && item.specificReferenceUrl) {
      replacements.push([item.specificReference, item.specificReferenceUrl]);
    }
    if (item.author && item.authorUrl) replacements.push([item.author, item.authorUrl]);

    for (const [label, url] of replacements) {
      const safeLabel = escapeHtml(label);
      if (!safeLabel || !text.includes(safeLabel)) continue;
      const anchor = `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${safeLabel}</a>`;
      text = text.replace(safeLabel, anchor);
    }
    return text;
  }

  function renderEditorial(tool) {
    document.title = `VISUAL LAB - ${tool.name}`;
    els.name.textContent = tool.name;
    els.version.textContent = tool.version || '';
    els.shortCopy.textContent = tool.copy?.short || '';
    els.description.textContent = tool.copy?.about || '';

    const implementation = tool.copy?.implementation || '';
    els.implementation.textContent = implementation;
    els.implementation.hidden = !implementation;

    els.meta.innerHTML = '';
    els.meta.appendChild(pill(tool.renderer));
    for (const tag of tool.conceptTags || []) els.meta.appendChild(pill(tag));

    els.download.href = tool.file;
    els.download.setAttribute('download', tool.file.split('/').pop());

    renderParameters(tool.parameters || []);
    renderLineage(tool.lineage || []);
    renderDevelopment(tool.development || {});
    updatePickerSelection(tool.slug);
    updateStandaloneHref();
  }

  function sentenceCase(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function ensureTerminalPunctuation(value) {
    const text = String(value || '').trim();
    if (!text) return '';
    return /[.!?…]$/.test(text) ? text : `${text}.`;
  }

  function sameEditorialThought(a, b) {
    const normalise = (value) => String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
    const aa = normalise(a);
    const bb = normalise(b);
    return aa && bb && (aa === bb || aa.includes(bb) || bb.includes(aa));
  }

  function renderParameters(items) {
    els.parameters.innerHTML = '';
    if (!items.length) {
      els.parameters.innerHTML = '<p class="muted">Parameter notes are still being prepared.</p>';
      return;
    }

    for (const item of items) {
      const article = document.createElement('div');
      article.className = 'parameter-item';

      const name = document.createElement('div');
      name.className = 'parameter-name';
      name.textContent = item.label;

      const copy = document.createElement('div');
      copy.className = 'parameter-copy';

      const behaviour = String(item.behaviour || '').trim();
      const explanation = String(item.explanation || '').trim();
      const combined = [];
      if (behaviour) combined.push(ensureTerminalPunctuation(behaviour));
      if (explanation && !sameEditorialThought(behaviour, explanation)) {
        combined.push(ensureTerminalPunctuation(sentenceCase(explanation)));
      }
      if (combined.length) {
        const p = document.createElement('p');
        p.className = 'parameter-description';
        p.textContent = combined.join(' ');
        copy.appendChild(p);
      }

      if (item.mapping) {
        const p = document.createElement('p');
        p.className = 'parameter-mapping';
        p.textContent = `Modulation tip: ${item.mapping}`;
        copy.appendChild(p);
      }

      article.append(name, copy);
      els.parameters.appendChild(article);
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

      const copy = document.createElement('p');
      copy.className = 'lineage-text';
      copy.innerHTML = linkifyPublicText(item);
      div.appendChild(copy);

      if (item.spark) {
        const spark = document.createElement('p');
        spark.className = 'lineage-spark';
        spark.textContent = item.spark;
        div.appendChild(spark);
      }

      const source = document.createElement('p');
      source.className = 'lineage-source';
      if (item.projectUrl) {
        const link = document.createElement('a');
        link.href = item.projectUrl;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = item.project || 'Source project';
        source.appendChild(link);
      } else {
        source.appendChild(document.createTextNode(item.project || 'Lineage'));
      }

      const suffix = [item.relation, item.sourceLicence].filter(Boolean).join(' · ');
      if (suffix) source.appendChild(document.createTextNode(` · ${suffix}`));
      div.appendChild(source);

      els.lineage.appendChild(div);
    }
  }

  function renderDevelopment(development) {
    els.development.innerHTML = '';
    let count = 0;
    if (development.limitations) {
      const div = document.createElement('div');
      div.className = 'development-block';
      div.innerHTML = `<h3>Known limitations</h3><p>${escapeHtml(development.limitations)}</p>`;
      els.development.appendChild(div);
      count += 1;
    }
    if (Array.isArray(development.nextIdeas) && development.nextIdeas.length) {
      const div = document.createElement('div');
      div.className = 'development-block';
      const list = development.nextIdeas.map((idea) => `<li>${escapeHtml(idea)}</li>`).join('');
      div.innerHTML = `<h3>Next ideas</h3><ul>${list}</ul>`;
      els.development.appendChild(div);
      count += 1;
    }
    if (!count) els.development.innerHTML = '<p class="muted">No public development notes yet.</p>';
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

  function createControlHeader(item) {
    const top = document.createElement('div');
    top.className = 'control-top';
    const label = document.createElement('span');
    label.className = 'control-label';
    label.textContent = item.label;
    top.appendChild(label);
    return top;
  }

  function updateStandaloneHref() {
    if (!els.standalone || !runtime.tool) return;
    const url = new URL(window.location.href);
    url.searchParams.set('tool', runtime.tool.slug);
    url.searchParams.set('view', 'standalone');
    const snapshot = {};
    if (runtime.state && runtime.manifest) {
      for (const item of [...(runtime.manifest.params || []), ...(runtime.manifest.colors || [])]) {
        snapshot[item.key] = runtime.state[item.key];
      }
    }
    if (Object.keys(snapshot).length) url.searchParams.set('state', JSON.stringify(snapshot));
    else url.searchParams.delete('state');
    els.standalone.href = url.toString();
  }

  function renderControls(manifest) {
    els.controls.innerHTML = '';
    els.colors.innerHTML = '';

    for (const param of manifest.params || []) {
      const row = document.createElement('div');
      row.className = 'control-row';
      row.appendChild(createControlHeader(param));

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
        updateStandaloneHref();
      };

      range.addEventListener('input', () => update(range.value, 'range'));
      number.addEventListener('input', () => {
        const parsed = Number(number.value);
        if (Number.isFinite(parsed)) {
          runtime.state[param.key] = numericValue(parsed, param);
          range.value = runtime.state[param.key];
          updateStandaloneHref();
        }
      });
      number.addEventListener('change', () => update(number.value, 'number'));
      number.addEventListener('blur', () => update(number.value, 'range'));

      wrap.append(range, number);
      row.appendChild(wrap);
      els.controls.appendChild(row);
    }

    const colors = manifest.colors || [];
    if (!colors.length) {
      els.colors.innerHTML = '<p class="muted color-empty">No color controls for this tool.</p>';
    }

    for (const color of colors) {
      const row = document.createElement('div');
      row.className = 'color-row';
      row.appendChild(createControlHeader(color));

      const wrap = document.createElement('div');
      wrap.className = 'color-control';

      const picker = document.createElement('input');
      picker.type = 'color';
      picker.value = runtime.state[color.key];
      picker.setAttribute('aria-label', color.label);

      const hex = document.createElement('input');
      hex.type = 'text';
      hex.className = 'hex-input';
      hex.value = String(runtime.state[color.key]).toUpperCase();
      hex.maxLength = 7;
      hex.setAttribute('aria-label', `${color.label} hex value`);

      const applyColor = (value) => {
        if (!/^#[0-9a-f]{6}$/i.test(value)) return false;
        const normalized = value.toUpperCase();
        runtime.state[color.key] = normalized;
        picker.value = normalized;
        hex.value = normalized;
        updateStandaloneHref();
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
      els.colors.appendChild(row);
    }

    els.reset.disabled = false;
  }

  function stateFromManifest(manifest) {
    const state = { time: 0 };
    for (const item of manifest.params || []) state[item.key] = item.default;
    for (const item of manifest.colors || []) state[item.key] = item.default;
    return state;
  }

  function applyRequestedState(state, manifest, requested) {
    if (!requested) return state;
    for (const param of manifest.params || []) {
      if (!Object.prototype.hasOwnProperty.call(requested, param.key)) continue;
      state[param.key] = numericValue(requested[param.key], param);
    }
    for (const color of manifest.colors || []) {
      const value = requested[color.key];
      if (typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)) state[color.key] = value.toUpperCase();
    }
    return state;
  }

  function activeStage() {
    return runtime.standaloneMode ? els.standaloneStage : els.previewStage;
  }

  function resizeTool() {
    if (!runtime.frameWindow || typeof runtime.frameWindow.sketchResize !== 'function') return;
    const stage = activeStage();
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
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
    updateStandaloneHref();
  }

  function mountFrameForMode() {
    const stage = activeStage();
    if (stage && els.frame.parentElement !== stage) stage.appendChild(els.frame);
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
      runtime.state = applyRequestedState(stateFromManifest(manifest), manifest, runtime.requestedState);

      if (!runtime.standaloneMode) renderControls(manifest);
      resizeTool();
      startRenderLoop();
      updateStandaloneHref();
    } catch (error) {
      setFatal(`Could not initialise this tool: ${error.message}`);
    }
  }

  function loadTool(tool) {
    runtime.tool = tool;
    runtime.manifest = null;
    runtime.frameWindow = null;
    runtime.state = null;
    runtime.requestedState = runtime.standaloneMode ? readRequestedState() : null;
    stopRenderLoop();
    clearFatal();

    if (!runtime.standaloneMode) {
      els.reset.disabled = true;
      els.controls.innerHTML = '<p class="muted">Waiting for tool manifest…</p>';
      els.colors.innerHTML = '<p class="muted">Waiting for tool manifest…</p>';
      renderEditorial(tool);
    } else {
      document.title = `VISUAL LAB - ${tool.name}`;
    }

    mountFrameForMode();
    els.frame.title = `${tool.name} live preview`;
    els.frame.src = tool.file;
  }

  async function boot() {
    clearFatal();
    try {
      if (runtime.standaloneMode) document.body.classList.add('is-standalone');

      const response = await fetch('data/tools.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`tools.json returned HTTP ${response.status}.`);
      runtime.data = await response.json();

      const tools = Array.isArray(runtime.data.tools) ? runtime.data.tools : [];
      if (!tools.length) throw new Error('No tools are defined in data/tools.json.');

      const requested = getRequestedSlug();
      const selected = tools.find((tool) => tool.slug === requested) || tools[0];

      if (!runtime.standaloneMode) {
        populatePicker(tools, selected.slug);
        if (requested !== selected.slug) {
          const url = new URL(window.location.href);
          url.searchParams.set('tool', selected.slug);
          window.history.replaceState({}, '', url);
        }
        els.reset.addEventListener('click', resetState);
      }

      els.frame.addEventListener('load', handleFrameLoaded);
      runtime.resizeObserver = new ResizeObserver(() => resizeTool());
      runtime.resizeObserver.observe(activeStage());

      window.addEventListener('popstate', () => {
        if (runtime.standaloneMode) return;
        const slug = getRequestedSlug();
        const tool = tools.find((item) => item.slug === slug) || tools[0];
        loadTool(tool);
      });

      loadTool(selected);
    } catch (error) {
      setFatal(`Visual Lab could not start: ${error.message}`);
    }
  }

  window.addEventListener('beforeunload', stopRenderLoop);
  boot();
})();
