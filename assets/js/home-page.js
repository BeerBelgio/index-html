(() => {
  'use strict';

  const grid = document.getElementById('tool-grid') || document.getElementById('tools');
  const errorBox = document.getElementById('home-error');
  const searchInput = document.getElementById('tool-search');
  const searchToggle = document.getElementById('tool-search-toggle');
  const searchField = document.getElementById('tool-search-field');
  const searchShell = document.getElementById('tool-search-shell');
  const tagFilters = document.getElementById('tool-tag-filters');
  const emptyState = document.getElementById('tool-filter-empty');
  const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;
  const homeHeader = document.getElementById('home-header');
  const heroBrand = document.getElementById('hero-brand');
  const heroToolMask = document.getElementById('hero-tool-mask');
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const HERO_RENDER_WIDTH = 831;
  const HERO_RENDER_HEIGHT = 211;
  let heroPreview = null;
  let heroVisible = true;

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

  function setSearchOpen(open) {
    if (!searchToggle || !searchField || !searchShell) return;
    searchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    searchField.hidden = !open;
    searchShell.classList.toggle('is-open', open);
    if (open) requestAnimationFrame(() => searchInput?.focus());
  }


  function syncStickyHeader() {
    if (!homeHeader) return;
    homeHeader.classList.toggle('is-scrolled', window.scrollY > 18);
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


  // Hero motion currently inherits the catalogue recipe so both surfaces speak
  // the same visual language. The separate hook is intentional: the next content
  // pass can give each tool distinct catalogue / hero recipes without changing
  // the loading architecture again.
  function applyHeroMotion(slug, state, dt) {
    applyCatalogueMotion(slug, state, dt);
  }

  function randomIndex(max) {
    if (max <= 1) return 0;
    if (window.crypto?.getRandomValues) {
      const value = new Uint32Array(1);
      window.crypto.getRandomValues(value);
      return value[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function heroCandidates(tools) {
    // Future catalogue metadata can set hero.enabled=false for tools that do not
    // compose well inside the 831×211 wordmark surface. For now every tool is eligible.
    return tools.filter((tool) => tool?.hero?.enabled !== false);
  }

  function drawHeroPreview(preview) {
    if (!preview || !runtimeReady(preview.iframe)) return false;

    try {
      const win = preview.iframe.contentWindow;
      const doc = preview.iframe.contentDocument;
      const canvas = doc?.getElementById('sketch-canvas');

      if (doc?.documentElement) {
        doc.documentElement.style.width = '100%';
        doc.documentElement.style.height = '100%';
        doc.documentElement.style.overflow = 'hidden';
      }
      if (doc?.body) {
        doc.body.style.margin = '0';
        doc.body.style.width = '100%';
        doc.body.style.height = '100%';
        doc.body.style.overflow = 'hidden';
      }
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.maxWidth = 'none';
        canvas.style.maxHeight = 'none';
      }

      // Keep the hero's logical render surface fixed to the Illustrator-measured
      // wordmark + claim bounds. CSS scales the iframe responsively afterwards.
      win.sketchResize(HERO_RENDER_WIDTH, HERO_RENDER_HEIGHT);
      win.sketchDraw(preview.state);
      return true;
    } catch (error) {
      console.warn('[INDEX HTML] hero draw failed:', preview.tool?.slug, error);
      return false;
    }
  }

  function stopHeroPreview() {
    if (!heroPreview) return;
    if (heroPreview.raf) cancelAnimationFrame(heroPreview.raf);
    heroPreview.raf = 0;
    heroPreview.lastTime = 0;
  }

  function startHeroPreview() {
    if (!heroPreview?.ready || heroPreview.raf || !heroVisible || document.hidden) return;
    if (prefersReducedMotion) return;

    const tick = (now) => {
      if (!heroPreview?.ready || !heroVisible || document.hidden) {
        if (heroPreview) {
          heroPreview.raf = 0;
          heroPreview.lastTime = 0;
        }
        return;
      }

      if (!heroPreview.lastTime) heroPreview.lastTime = now;
      const dt = Math.min(0.05, Math.max(0, (now - heroPreview.lastTime) / 1000));
      heroPreview.lastTime = now;
      heroPreview.state.time += dt;
      applyHeroMotion(heroPreview.tool.slug, heroPreview.state, dt);
      drawHeroPreview(heroPreview);
      heroPreview.raf = requestAnimationFrame(tick);
    };

    heroPreview.raf = requestAnimationFrame(tick);
  }

  async function initialiseHeroPreview(tools) {
    if (!heroBrand || !heroToolMask) return;

    const candidates = heroCandidates(tools);
    if (!candidates.length) return;

    const tool = candidates[randomIndex(candidates.length)];
    const iframe = document.createElement('iframe');
    iframe.title = `${tool.name} hero preview`;
    iframe.setAttribute('aria-hidden', 'true');

    try {
      const loadPromise = waitForIframeLoad(iframe);
      iframe.src = `${tool.file}?hero=1`;
      heroToolMask.replaceChildren(iframe);

      await loadPromise;
      const ready = await waitForRuntime(iframe);
      if (!ready) throw new Error('tool runtime did not become ready');

      heroPreview = {
        tool,
        iframe,
        state: stateFromManifest(iframe.contentWindow.SKETCH_TOOL),
        ready: true,
        raf: 0,
        lastTime: 0
      };

      await nextFrame();
      await nextFrame();

      if (!drawHeroPreview(heroPreview)) throw new Error('initial hero draw failed');

      heroBrand.classList.add('is-rendered');

      // The hero is always animated while visible. Hover is deliberately irrelevant.
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        heroVisible = !!entry?.isIntersecting;
        if (heroVisible) startHeroPreview();
        else stopHeroPreview();
      }, { rootMargin: '120px 0px' });
      observer.observe(heroBrand);
      heroPreview.observer = observer;

      if (prefersReducedMotion) {
        // Keep one clean static frame for users who request reduced motion.
        drawHeroPreview(heroPreview);
      } else {
        startHeroPreview();
      }
    } catch (error) {
      console.warn('[INDEX HTML] hero preview unavailable:', error);
      heroPreview?.observer?.disconnect();
      heroPreview = null;
      heroToolMask.replaceChildren();
      heroBrand.classList.remove('is-rendered');
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
    if (!grid) {
      showError('Catalogue mount was not found.');
      return;
    }
    try {
      const response = await fetch('data/tools.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`tools.json returned HTTP ${response.status}`);
      const data = await response.json();
      const tools = Array.isArray(data.tools) ? data.tools : [];
      if (!tools.length) throw new Error('No tools are defined.');

      catalogue.tools = tools;
      void initialiseHeroPreview(tools);
      buildTagFilters(tools);

      const frag = document.createDocumentFragment();
      for (const tool of tools) {
        const card = toolCard(tool);
        catalogue.cards.push(card);
        frag.appendChild(card);
      }
      grid.replaceChildren(frag);

      searchToggle?.addEventListener('click', () => {
        const open = searchToggle.getAttribute('aria-expanded') === 'true';
        if (open && searchInput?.value) {
          searchInput.focus();
          return;
        }
        setSearchOpen(!open);
      });

      searchInput?.addEventListener('input', () => {
        catalogue.query = searchInput.value;
        applyFilters();
      });

      searchInput?.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (searchInput.value) {
          searchInput.value = '';
          catalogue.query = '';
          applyFilters();
        }
        setSearchOpen(false);
        searchToggle?.focus();
      });

      searchInput?.addEventListener('blur', () => {
        if (searchInput.value) return;
        window.setTimeout(() => {
          if (!searchShell?.contains(document.activeElement)) setSearchOpen(false);
        }, 80);
      });
    } catch (error) {
      showError(`INDEX HTML catalogue could not start: ${error.message}`);
    }
  }

  syncStickyHeader();
  window.addEventListener('scroll', syncStickyHeader, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (!heroPreview?.ready) return;
    if (document.hidden) stopHeroPreview();
    else if (heroVisible) startHeroPreview();
  });

  window.addEventListener('beforeunload', () => {
    stopHeroPreview();
    heroPreview?.observer?.disconnect();
    for (const preview of livePreviews) {
      stopPreview(preview);
      preview.resizeObserver?.disconnect();
    }
  });

  boot();
})();
