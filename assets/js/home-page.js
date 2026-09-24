(() => {
  'use strict';

  const grid = document.getElementById('tool-grid');
  const errorBox = document.getElementById('home-error');
  const previewObservers = [];
  const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  function showError(message) {
    if (!errorBox) return;
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function stateFromManifest(manifest) {
    const state = { time: 2.75 };
    for (const item of manifest.params || []) state[item.key] = item.default;
    for (const item of manifest.colors || []) state[item.key] = item.default;
    return state;
  }

  function resizeAndDraw(preview, stage) {
    const { iframe, state } = preview;
    const win = iframe.contentWindow;
    if (!win || !win.SKETCH_TOOL || typeof win.sketchResize !== 'function' || typeof win.sketchDraw !== 'function') return false;

    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const cssWidth = Math.max(1, Math.floor(rect.width));
    const cssHeight = Math.max(1, Math.floor(rect.height));
    const width = Math.max(1, Math.floor(cssWidth * dpr));
    const height = Math.max(1, Math.floor(cssHeight * dpr));

    try {
      const canvas = iframe.contentDocument && iframe.contentDocument.getElementById('sketch-canvas');
      if (canvas) {
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;
        canvas.style.maxWidth = 'none';
        canvas.style.maxHeight = 'none';
      }
      win.sketchResize(width, height);
      win.sketchDraw(state);
      stage.classList.add('is-rendered');
      const placeholder = stage.querySelector('.preview-placeholder');
      if (placeholder) placeholder.remove();
      return true;
    } catch (error) {
      const placeholder = stage.querySelector('.preview-placeholder');
      if (placeholder) placeholder.textContent = 'PREVIEW UNAVAILABLE';
      console.warn('[Visual Lab] catalogue preview failed:', error);
      return false;
    }
  }

  function stopPreview(preview) {
    preview.hovered = false;
    if (preview.raf) cancelAnimationFrame(preview.raf);
    preview.raf = 0;
    preview.lastTime = 0;
  }

  function startPreview(preview, stage) {
    if (!preview.ready || !canHover) return;
    preview.hovered = true;
    if (preview.raf) return;

    const tick = (now) => {
      if (!preview.hovered || !preview.ready) {
        preview.raf = 0;
        preview.lastTime = 0;
        return;
      }
      if (!preview.lastTime) preview.lastTime = now;
      const dt = Math.min(0.05, Math.max(0, (now - preview.lastTime) / 1000));
      preview.lastTime = now;
      preview.state.time += dt;
      resizeAndDraw(preview, stage);
      preview.raf = requestAnimationFrame(tick);
    };
    preview.raf = requestAnimationFrame(tick);
  }

  function activatePreview(stage, tool, card) {
    if (stage.dataset.loaded === 'true') return;
    stage.dataset.loaded = 'true';

    const iframe = document.createElement('iframe');
    iframe.title = `${tool.name} catalogue preview`;
    iframe.loading = 'lazy';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.src = tool.file;

    const preview = {
      iframe,
      state: null,
      ready: false,
      hovered: false,
      wantsAnimation: false,
      raf: 0,
      lastTime: 0,
      resizeObserver: null
    };
    stage._visualLabPreview = preview;

    if (canHover) {
      card.addEventListener('pointerenter', () => {
        preview.wantsAnimation = true;
        if (preview.ready) startPreview(preview, stage);
      });
      card.addEventListener('pointerleave', () => {
        preview.wantsAnimation = false;
        stopPreview(preview);
      });
    }

    iframe.addEventListener('load', () => {
      const win = iframe.contentWindow;
      if (!win || !win.SKETCH_TOOL || typeof win.sketchResize !== 'function' || typeof win.sketchDraw !== 'function') {
        const placeholder = stage.querySelector('.preview-placeholder');
        if (placeholder) placeholder.textContent = 'PREVIEW UNAVAILABLE';
        return;
      }

      preview.state = stateFromManifest(win.SKETCH_TOOL);
      preview.ready = true;
      resizeAndDraw(preview, stage);

      preview.resizeObserver = new ResizeObserver(() => {
        if (preview.ready && !preview.hovered) resizeAndDraw(preview, stage);
      });
      preview.resizeObserver.observe(stage);
      previewObservers.push(preview.resizeObserver);

      if (preview.wantsAnimation) startPreview(preview, stage);
    });

    stage.appendChild(iframe);
  }

  function toolCard(tool) {
    const a = document.createElement('a');
    a.className = 'tool-card';
    a.href = `tool.html?tool=${encodeURIComponent(tool.slug)}`;

    const tags = (tool.conceptTags || [])
      .map((tag) => `<span class="tool-card-tag">${escapeHtml(tag)}</span>`)
      .join('');

    a.innerHTML = `
      <div class="tool-card-preview" data-preview-stage>
        <div class="preview-placeholder">LOADING PREVIEW</div>
      </div>
      <div class="tool-card-copy">
        <div class="tool-card-meta">
          <div class="tool-card-tags">${tags}</div>
          <span class="tool-card-version">${escapeHtml(tool.version || '')}</span>
        </div>
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.copy?.short || '')}</p>
        <span class="tool-card-open">OPEN TOOL <span class="arrow-icon" aria-hidden="true"></span></span>
      </div>`;

    const stage = a.querySelector('[data-preview-stage]');
    const io = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.disconnect();
        activatePreview(stage, tool, a);
        break;
      }
    }, { rootMargin: '240px 0px' });

    io.observe(stage);
    previewObservers.push(io);
    return a;
  }

  async function boot() {
    if (!grid) return;
    try {
      const response = await fetch('data/tools.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`tools.json returned HTTP ${response.status}`);
      const data = await response.json();
      const tools = Array.isArray(data.tools) ? data.tools : [];
      if (!tools.length) throw new Error('No tools are defined.');

      const frag = document.createDocumentFragment();
      for (const tool of tools) frag.appendChild(toolCard(tool));
      grid.replaceChildren(frag);
    } catch (error) {
      showError(`Visual Lab catalogue could not start: ${error.message}`);
    }
  }

  window.addEventListener('beforeunload', () => {
    document.querySelectorAll('[data-preview-stage]').forEach((stage) => {
      const preview = stage._visualLabPreview;
      if (!preview) return;
      stopPreview(preview);
      preview.resizeObserver?.disconnect();
    });
    for (const observer of previewObservers) observer.disconnect?.();
  });

  boot();
})();
