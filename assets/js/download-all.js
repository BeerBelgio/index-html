(() => {
  'use strict';

  const utf8 = new TextEncoder();
  const ZIP_ROOT = 'INDEX-HTML';
  const decoder = new TextDecoder('utf-8');

  const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n += 1) {
      let c = n;
      for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i += 1) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function concatBytes(chunks) {
    const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }

  function writeU16(view, offset, value) { view.setUint16(offset, value, true); }
  function writeU32(view, offset, value) { view.setUint32(offset, value >>> 0, true); }

  function createZipBytes(entries) {
    const localChunks = [];
    const centralChunks = [];
    let localOffset = 0;

    for (const entry of entries) {
      const nameBytes = utf8.encode(entry.name.replace(/^\/+/, ''));
      const dataBytes = entry.bytes instanceof Uint8Array ? entry.bytes : new Uint8Array(entry.bytes);
      const crc = crc32(dataBytes);

      const local = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(local.buffer);
      writeU32(lv, 0, 0x04034B50);
      writeU16(lv, 4, 20);
      writeU16(lv, 6, 0x0800); // UTF-8 names
      writeU16(lv, 8, 0);      // STORE / no compression
      writeU16(lv, 10, 0);     // deterministic DOS time
      writeU16(lv, 12, 0x0021);// 1980-01-01
      writeU32(lv, 14, crc);
      writeU32(lv, 18, dataBytes.length);
      writeU32(lv, 22, dataBytes.length);
      writeU16(lv, 26, nameBytes.length);
      writeU16(lv, 28, 0);
      local.set(nameBytes, 30);
      localChunks.push(local, dataBytes);

      const central = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(central.buffer);
      writeU32(cv, 0, 0x02014B50);
      writeU16(cv, 4, 20);
      writeU16(cv, 6, 20);
      writeU16(cv, 8, 0x0800);
      writeU16(cv, 10, 0);
      writeU16(cv, 12, 0);
      writeU16(cv, 14, 0x0021);
      writeU32(cv, 16, crc);
      writeU32(cv, 20, dataBytes.length);
      writeU32(cv, 24, dataBytes.length);
      writeU16(cv, 28, nameBytes.length);
      writeU16(cv, 30, 0);
      writeU16(cv, 32, 0);
      writeU16(cv, 34, 0);
      writeU16(cv, 36, 0);
      writeU32(cv, 38, 0);
      writeU32(cv, 42, localOffset);
      central.set(nameBytes, 46);
      centralChunks.push(central);

      localOffset += local.length + dataBytes.length;
    }

    const centralBytes = concatBytes(centralChunks);
    const end = new Uint8Array(22);
    const ev = new DataView(end.buffer);
    writeU32(ev, 0, 0x06054B50);
    writeU16(ev, 4, 0);
    writeU16(ev, 6, 0);
    writeU16(ev, 8, entries.length);
    writeU16(ev, 10, entries.length);
    writeU32(ev, 12, centralBytes.length);
    writeU32(ev, 16, localOffset);
    writeU16(ev, 20, 0);

    return concatBytes([...localChunks, centralBytes, end]);
  }

  async function fetchBytes(path) {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
    return new Uint8Array(await response.arrayBuffer());
  }

  function bundleReadme(catalogue) {
    const build = catalogue?.project?.stagingBuild || 'current';
    const count = Array.isArray(catalogue?.tools) ? catalogue.tools.length : 0;
    return `INDEX HTML\nCreative code for visual systems.\n\nCurrent bundle: ${build}\nTools: ${count}\n\nThis ZIP was generated from the current INDEX HTML catalogue when you clicked DOWNLOAD ALL.\nThe HTML files inside tools/ are the same canonical files offered by the individual DOWNLOAD HTML buttons.\n\nThe tools/ directory is intentionally flat and self-contained so it can be kept as a local collection or used by a compatible host/cache workflow.\n\nProject: https://github.com/BeerBelgio/index-html\nBeerBelgio: https://beerbelgio.github.io/\n\nOriginal code: PolyForm Noncommercial 1.0.0\nSee LEGAL.md.\n\nFun is a serious thing.\n`;
  }

  function localManifest(catalogue) {
    return {
      schemaVersion: 1,
      project: {
        name: 'INDEX HTML',
        build: catalogue?.project?.stagingBuild || null,
        repository: 'https://github.com/BeerBelgio/index-html',
        hub: 'https://beerbelgio.github.io/'
      },
      tools: (catalogue.tools || []).map((tool) => ({
        toolId: tool.toolId || null,
        name: tool.name,
        version: tool.version,
        toolType: tool.toolType || 'generator',
        file: `tools/${String(tool.file).split('/').pop()}`
      }))
    };
  }

  async function buildBundleEntries(onProgress) {
    const catalogueResponse = await fetch('data/tools.json', { cache: 'no-store' });
    if (!catalogueResponse.ok) throw new Error(`tools.json returned HTTP ${catalogueResponse.status}`);
    const catalogue = await catalogueResponse.json();
    const tools = Array.isArray(catalogue.tools) ? catalogue.tools : [];
    if (!tools.length) throw new Error('No tools found in data/tools.json');

    onProgress?.('FETCHING TOOLS…');
    const toolEntries = await Promise.all(tools.map(async (tool) => {
      const bytes = await fetchBytes(tool.file);
      const filename = String(tool.file).split('/').pop();
      return { name: `${ZIP_ROOT}/tools/${filename}`, bytes };
    }));

    onProgress?.('PACKING FILES…');
    const [license, notices, identity] = await Promise.all([
      fetchBytes('LICENSE.md'),
      fetchBytes('THIRD_PARTY_NOTICES.md'),
      fetchBytes('assets/branding/INDEX-HTML_BEERBELGIO.svg')
    ]);

    const legal = `# INDEX HTML — LEGAL\n\nThis file combines the project licence and third-party notices shipped with this downloaded collection.\n\n---\n\n${decoder.decode(license).trim()}\n\n---\n\n${decoder.decode(notices).trim()}\n`;

    return {
      catalogue,
      entries: [
        ...toolEntries,
        { name: `${ZIP_ROOT}/README.txt`, bytes: utf8.encode(bundleReadme(catalogue)) },
        { name: `${ZIP_ROOT}/LEGAL.md`, bytes: utf8.encode(legal) },
        { name: `${ZIP_ROOT}/INDEX-HTML-MANIFEST.json`, bytes: utf8.encode(JSON.stringify(localManifest(catalogue), null, 2) + '\n') },
        { name: `${ZIP_ROOT}/INDEX-HTML_BEERBELGIO.svg`, bytes: identity }
      ]
    };
  }

  async function downloadCurrentCollection(onProgress) {
    const bundle = await buildBundleEntries(onProgress);
    const bytes = createZipBytes(bundle.entries);
    const build = String(bundle.catalogue?.project?.stagingBuild || 'current').replace(/[^A-Za-z0-9._-]+/g, '-');
    const blob = new Blob([bytes], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `INDEX-HTML-${build}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function setButtonLabel(button, label) {
    const target = button.querySelector('[data-download-all-label]');
    if (target) target.textContent = label;
  }

  function initialiseButtons() {
    const buttons = [...document.querySelectorAll('[data-download-all]')];
    for (const button of buttons) {
      if (button.dataset.downloadAllReady === 'true') continue;
      button.dataset.downloadAllReady = 'true';
      const initial = button.querySelector('[data-download-all-label]')?.textContent || 'DOWNLOAD ALL TOOLS';
      button.addEventListener('click', async () => {
        if (button.disabled) return;
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        try {
          setButtonLabel(button, 'PREPARING…');
          await downloadCurrentCollection((label) => setButtonLabel(button, label));
          setButtonLabel(button, 'DOWNLOADED');
        } catch (error) {
          console.error('[INDEX HTML] Download All failed:', error);
          setButtonLabel(button, 'TRY AGAIN');
          button.title = error?.message || 'Download failed';
        } finally {
          setTimeout(() => {
            setButtonLabel(button, initial);
            button.disabled = false;
            button.removeAttribute('aria-busy');
          }, 1400);
        }
      });
    }
  }

  globalThis.INDEX_DOWNLOAD_ALL = {
    crc32,
    createZipBytes,
    buildBundleEntries,
    downloadCurrentCollection
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseButtons, { once: true });
    else initialiseButtons();
  }
})();
