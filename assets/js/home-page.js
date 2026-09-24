(() => {
  'use strict';

  const grid = document.getElementById('tool-grid');
  const errorBox = document.getElementById('home-error');
  const searchInput = document.getElementById('tool-search');
  const tagFilters = document.getElementById('tool-tag-filters');
  const emptyState = document.getElementById('tool-filter-empty');
  const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;

  const catalogue = {
    tools: [],
    cards: [],
    query: '',
    tag: 'all'
  };

  // Catalogue previews are loaded by our own queue. Avoid native iframe lazy-loading:
  // IntersectionObserver decides when a card is close enough, then at most two tools
  // initialise in parallel. This keeps the catalogue robust as the tool count grows.
  const previewQueue = [];
  const livePreviews = new Set();
  const MAX_CONCURRENT_PREVIEW_LOADS = 2;
  let activePreviewLoads = 0;

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  // Staging-only catalogue motion recipes. They affect card previews only and do
  // not alter a tool's manifest defaults or the downloadable HTML file.
  function applyCatalogueMotion(slug, state, dt) {
    switch (slug) {
      case 'cassini-flow':
        state.drift = Math.max(Number(state.drift) || 0, 72);
        break;
      case 'caustic-stitch':
        state.accent_variations = Math.floor(state.time * 2.6) % 101;
        break;
      case 'cellular-field':
        state.warp = 38 + 28 * Math.sin(state.time * 0.58);
        break;
      case 'form-cutter': {
        const beat = (state.time * 2) % 1;
        state.trigger = beat < 0.065 ? 100 * (1 - beat / 0.065) : 0;
        break;
      }
      case 'formshift': {
        const beat = (state.time * 2) % 1;
        state.trigger = beat < 0.08 ? 100 * (1 - beat / 0.08) : 0;
        break;
      }
      case 'fractured-mask':
        state.seed = Math.floor(state.time * 1.15) % 101;
        state.coverage_distribution = 54 + 34 * Math.sin(state.time * 0.68);
        break;
      case 'nodal-morph':
        state.morph = 28 + 22 * Math.sin(state.time * 0.53);
        state.rotation = (state.time * 12) % 360;
        break;
      case 'scatter-front':
        state.progress = 50 + 50 * Math.sin(state.time * 0.22);
        break;
      case 'topographic':
        state.height_shift = ((Number(state.height_shift) || 0) + dt * 2.2) % 100;
        state.drift = 18;
        break;
      case 'topographic-mask':
        state.height_shift = ((Number(state.height_shift) || 0) + dt * 4.0) % 100;
        break;
      default:
        break;
    }
  }

  function runtimeReady(iframe) {
    try {
      const win = iframe.contentWindow;
      return !!(
        win &&
        win.SKETCH_TOOL &&
        typeof win.sketchResize === 'function' &&
        typeof win.sketchDraw === 'function'
      );
    } catch (_) {
      return false;
    }
  }

  async function waitForRuntime(iframe, timeoutMs = 3200) {
    const started = performance.now();
    while (performance.now() - started < timeoutMs) {
      if (runtimeReady(iframe)) return true;
      await delay(40);
    }
    return runtimeReady(iframe);
  }

  function waitForIframeLoad(iframe, timeoutMs = 7000) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (fn, value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        iframe.removeEventListener('load', onLoad);
        iframe.removeEventListener('error', onError);
        fn(value);
      };
      const onLoad = () => finish(resolve);
      const onError = () => finish(reject, new Error('iframe load error'));
      const timer = setTimeout(() => finish(reject, new Error('iframe load timeout')), timeoutMs);
      iframe.addEventListener('load', onLoad, { once: true });
      iframe.addEventListener('error', onError, { once: true });
    });
  }

  function resizeAndDraw(preview, stage) {
    const { iframe, state } = preview;
    if (!runtimeReady(iframe) || !state) return false;

    const rect = stage.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return false;

    const win = iframe.contentWindow;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const cssWidth = Math.max(1, Math.floor(rect.width));
    const cssHeight = Math.max(1, Math.floor(rect.height));
    const width = Math.max(1, Math.floor(cssWidth * dpr));
    const height = Math.max(1, Math.floor(cssHeight * dpr));

    try {
      const canvas = iframe.contentDocument?.getElementById('sketch-canvas');
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
      console.warn('[INDEX HTML] catalogue draw failed:', preview.slug, error);
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
      applyCatalogueMotion(preview.slug, preview.state, dt);
      resizeAndDraw(preview, stage);
      preview.raf = requestAnimationFrame(tick);
    };
    preview.raf = requestAnimationFrame(tick);
  }

  function bindPreviewInteraction(preview) {
    if (!canHover) return;
    preview.card.addEventListener('pointerenter', () => {
      preview.wantsAnimation = true;
      if (preview.ready) startPreview(preview, preview.stage);
    });
    preview.card.addEventListener('pointerleave', () => {
      preview.wantsAnimation = false;
      stopPreview(preview);
    });
  }

  async function createAndInitialiseIframe(preview, attempt) {
    const iframe = document.createElement('iframe');
    iframe.title = `${preview.tool.name} catalogue preview`;
    iframe.setAttribute('aria-hidden', 'true');
    preview.iframe = iframe;

    // Attach the load/error listeners before navigation starts. Cached local tool
    // files can otherwise finish fast enough to race a listener registered later.
    const loadPromise = waitForIframeLoad(iframe);
    iframe.src = `${preview.tool.file}?catalogue=1&attempt=${attempt}`;
    preview.stage.appendChild(iframe);

    await loadPromise;
    const ready = await waitForRuntime(iframe);
    if (!ready) throw new Error('tool runtime did not become ready');

    preview.state = stateFromManifest(iframe.contentWindow.SKETCH_TOOL);
    await nextFrame();
    await nextFrame();

    if (!resizeAndDraw(preview, preview.stage)) {
      // A filtered/temporarily zero-sized card is not a runtime failure.
      // ResizeObserver will draw it as soon as it has usable dimensions.
      const rect = preview.stage.getBoundingClientRect();
      if (rect.width >= 2 && rect.height >= 2) throw new Error('initial draw failed');
    }

    preview.resizeObserver = new ResizeObserver(() => {
      if (preview.ready && !preview.hovered) resizeAndDraw(preview, preview.stage);
    });
    preview.resizeObserver.observe(preview.stage);
    livePreviews.add(preview);
  }

  async function initialisePreview(preview) {
    const placeholder = preview.stage.querySelector('.preview-placeholder');

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        if (preview.iframe) preview.iframe.remove();
        await createAndInitialiseIframe(preview, attempt);
        preview.ready = true;
        preview.stage.dataset.previewState = 'ready';
        resizeAndDraw(preview, preview.stage);
        if (preview.wantsAnimation) startPreview(preview, preview.stage);
        return;
      } catch (error) {
        console.warn(`[INDEX HTML] preview init attempt ${attempt} failed:`, preview.slug, error);
        preview.ready = false;
        preview.resizeObserver?.disconnect();
        preview.resizeObserver = null;
        preview.iframe?.remove();
        preview.iframe = null;
        if (attempt < 2) await delay(140);
      }
    }

    preview.stage.dataset.previewState = 'error';
    if (placeholder) placeholder.textContent = 'PREVIEW UNAVAILABLE';
  }

  function processPreviewQueue() {
    while (activePreviewLoads < MAX_CONCURRENT_PREVIEW_LOADS && previewQueue.length) {
      const preview = previewQueue.shift();
      if (!preview || preview.started) continue;
      preview.started = true;
      activePreviewLoads += 1;
      initialisePreview(preview)
        .finally(() => {
          activePreviewLoads -= 1;
          processPreviewQueue();
        });
    }
  }

  function queuePreview(stage, tool, card) {
    if (stage.dataset.previewQueued === 'true') return;
    stage.dataset.previewQueued = 'true';

    const preview = {
      tool,
      card,
      stage,
      slug: tool.slug,
      iframe: null,
      state: null,
      ready: false,
      started: false,
      hovered: false,
      wantsAnimation: false,
      raf: 0,
      lastTime: 0,
      resizeObserver: null
    };

    stage._indexHtmlPreview = preview;
    bindPreviewInteraction(preview);
    previewQueue.push(preview);
    processPreviewQueue();
  }

  function toolCard(tool) {
    const a = document.createElement('a');
    a.className = 'tool-card';
    a.href = `tool.html?tool=${encodeURIComponent(tool.slug)}`;
    a.dataset.toolName = String(tool.name || '').toLowerCase();
    a.dataset.toolTags = (tool.conceptTags || []).map((tag) => String(tag).toLowerCase()).join(' ');

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
        queuePreview(stage, tool, a);
        break;
      }
    }, { rootMargin: '300px 0px' });

    io.observe(stage);
    return a;
  }

  function buildTagFilters(tools) {
    if (!tagFilters) return;
    const tags = [...new Set(tools.flatMap((tool) => tool.conceptTags || []))]
      .map(String)
      .sort((a, b) => a.localeCompare(b));

    const makeButton = (label, value) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tool-tag-filter';
      button.dataset.tag = value;
      button.textContent = label;
      button.addEventListener('click', () => {
        catalogue.tag = value;
        tagFilters.querySelectorAll('.tool-tag-filter').forEach((item) => {
          item.classList.toggle('is-active', item.dataset.tag === value);
        });
        applyFilters();
      });
      return button;
    };

    const all = makeButton('ALL', 'all');
    all.classList.add('is-active');
    tagFilters.appendChild(all);
    for (const tag of tags) tagFilters.appendChild(makeButton(tag, tag.toLowerCase()));
  }

  function applyFilters() {
    const query = catalogue.query.trim().toLowerCase();
    let visible = 0;

    for (const card of catalogue.cards) {
      const haystack = `${card.dataset.toolName} ${card.dataset.toolTags}`;
      const queryMatch = !query || haystack.includes(query);
      const tagMatch = catalogue.tag === 'all' || card.dataset.toolTags.split(/\s+/).includes(catalogue.tag);
      const show = queryMatch && tagMatch;
      card.hidden = !show;
      if (show) visible += 1;
    }

    if (emptyState) emptyState.hidden = visible !== 0;
  }

  async function boot() {
    if (!grid) return;
    try {
      const response = await fetch('data/tools.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`tools.json returned HTTP ${response.status}`);
      const data = await response.json();
      const tools = Array.isArray(data.tools) ? data.tools : [];
      if (!tools.length) throw new Error('No tools are defined.');

      catalogue.tools = tools;
      buildTagFilters(tools);

      const frag = document.createDocumentFragment();
      for (const tool of tools) {
        const card = toolCard(tool);
        catalogue.cards.push(card);
        frag.appendChild(card);
      }
      grid.replaceChildren(frag);

      searchInput?.addEventListener('input', () => {
        catalogue.query = searchInput.value;
        applyFilters();
      });
    } catch (error) {
      showError(`INDEX HTML catalogue could not start: ${error.message}`);
    }
  }

  window.addEventListener('beforeunload', () => {
    for (const preview of livePreviews) {
      stopPreview(preview);
      preview.resizeObserver?.disconnect();
    }
  });

  boot();
})();
