/* Two independent catalogues. HTML manifests remain authoritative. */
(() => {
  'use strict';
  async function load() {
    const read = async file => {
      const response = await fetch(file, {cache:'no-store'});
      if (!response.ok) throw Error(file + ' HTTP ' + response.status);
      const data = await response.json();
      if (!Array.isArray(data.tools)) throw Error(file + ' missing tools[]');
      return data;
    };
    const [generators, effects] = await Promise.all([read('data/tools.json'), read('data/fx.json')]);
    const tools = [...generators.tools, ...effects.tools];
    for (const field of ['slug','toolId']) {
      if (tools.some(t => !t[field]) || new Set(tools.map(t=>t[field])).size !== tools.length) throw Error('Duplicate/missing catalogue '+field);
    }
    return {...generators, tools};
  }
  window.IndexCatalogues = {load};
})();
