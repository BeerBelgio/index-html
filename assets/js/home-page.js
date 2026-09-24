(() => {
  'use strict';

  const grid = document.getElementById('tool-grid');
  const errorBox = document.getElementById('home-error');
  const previewObservers = [];

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function stateFromManifest(manifest) {
    const state = { time: 2.75 };
    for (const item of manifest.params || []) state[item.key] = item.default;
    for (const item of manifest.colors || []) state[item.key] = item.default;
    return state;
  }

  function renderFrozenFrame(iframe, stage) {
    const win = iframe.contentWindow;
    if (!win || !win.SKETCH_TOOL || typeof win.sketchResize !== 'function' || typeof win.sketchDraw !== 'function') return;
    const rect = stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    try {
      const canvas = iframe.contentDocument && iframe.contentDocument.getElementById('sketch-canvas');
      if (canvas) {
        canvas.style.width = `${Math.max(1, Math.floor(rect.width))}px`;
        canvas.style.height = `${Math.max(1, Math.floor(rect.height))}px`;
        canvas.style.maxWidth = 'none';
        canvas.style.maxHeight = 'none';
      }
      win.sketchResize(width, height);
      win.sketchDraw(stateFromManifest(win.SKETCH_TOOL));
      stage.classList.add('is-rendered');
      const placeholder = stage.querySelector('.preview-placeholder');
      if (placeholder) placeholder.remove();
    } catch (error) {
      const placeholder = stage.querySelector('.preview-placeholder');
      if (placeholder) placeholder.textContent = 'PREVIEW UNAVAILABLE';
      console.warn('[Visual Lab] catalogue preview failed:', error);
    }
  }

  function activatePreview(stage, tool) {
    if (stage.dataset.loaded === 'true') return;
    stage.dataset.loaded = 'true';
    const iframe = document.createElement('iframe');
    iframe.title = `${tool.name} frozen preview`;
    iframe.loading = 'lazy';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.src = tool.file;
    iframe.addEventListener('load', () => {
      renderFrozenFrame(iframe, stage);
      const ro = new ResizeObserver(() => renderFrozenFrame(iframe, stage));
      ro.observe(stage);
      previewObservers.push(ro);
    });
    stage.appendChild(iframe);
  }

  function toolCard(tool) {
    const a = document.createElement('a');
    a.className = 'tool-card';
    a.href = `tool.html?tool=${encodeURIComponent(tool.slug)}`;

    const tags = (tool.conceptTags || []).map((tag) => `<span class="tool-card-tag">${escapeHtml(tag)}</span>`).join('');
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
        activatePreview(stage, tool);
        break;
      }
    }, { rootMargin: '240px 0px' });
    io.observe(stage);
    previewObservers.push(io);
    return a;
  }

  async function boot() {
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
    for (const observer of previewObservers) observer.disconnect?.();
  });
  boot();
})();
