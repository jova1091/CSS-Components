const COMPONENT_REGISTRY = {
  accordion:    { css: 'components/accordion/accordion.css',    js: 'components/accordion.js' },
  alerts:       { css: 'components/alerts/alerts.css',          js: null },
  avatar:       { css: 'components/avatar/avatar.css',          js: null },
  badges:       { css: 'components/badges/badges.css',          js: null },
  breadcrumb:   { css: 'components/breadcrumb/breadcrumb.css',  js: null },
  buttons:      { css: 'components/buttons/buttons.css',        js: null },
  'btn-group':  { css: 'components/buttons/btn-group.css',      js: null },
  cards:        { css: 'components/cards/cards.css',            js: null },
  carousel:     { css: 'components/carousel/carousel.css',      js: 'components/carousel.js' },
  chips:        { css: 'components/chips/chips.css',            js: 'components/chips.js' },
  drawer:       { css: 'components/drawer/drawer.css',          js: 'components/drawer.js' },
  dropdown:     { css: 'components/dropdown/dropdown.css',      js: 'components/dropdown.js' },
  'float-labels': { css: 'components/forms/float-labels.css',   js: 'components/float-labels.js' },
  forms:        { css: 'components/forms/forms.css',            js: null },
  helpers:      { css: 'utilities/helpers/helpers.css',         js: null },
  'list-groups': { css: 'components/list-groups/list-groups.css', js: null },
  modal:        { css: 'components/modal/modal.css',            js: 'components/modal.js' },
  navbar:       { css: 'components/navbar/navbar.css',          js: 'components/navbar.js' },
  pagination:   { css: 'components/pagination/pagination.css',  js: null },
  popovers:     { css: 'components/popovers/popovers.css',      js: 'components/popovers.js' },
  progress:     { css: 'components/progress/progress.css',      js: null },
  skeletons:    { css: 'components/skeletons/skeletons.css',    js: null },
  spacers:      { css: 'utilities/spacers/spacers.css',         js: null },
  spinners:     { css: 'components/spinners/spinners.css',      js: null },
  tables:       { css: 'components/tables/tables.css',          js: null },
  tabs:         { css: 'components/tabs/tabs.css',              js: 'components/tabs.js' },
  toasts:       { css: 'components/toasts/toasts.css',          js: 'components/toasts.js' },
  tooltips:     { css: 'components/tooltips/tooltips.css',      js: 'components/tooltips.js' },
};

const BASE_CSS_PATH = '/assets/css';
const BASE_JS_PATH = '/assets/js';
const loadedCSS = new Set();
const loadedJS = new Set();
let modulesCache = {};
let observer = null;

export class ComponentLoader {

  static load(name, container = document) {
    const entry = COMPONENT_REGISTRY[name];
    if (!entry) return Promise.reject(new Error(`Component "${name}" not found in registry.`));

    const cssLoaded = this._loadCSS(entry.css);
    const jsLoaded = entry.js ? this._loadJS(entry.js, name) : Promise.resolve(null);

    return Promise.all([cssLoaded, jsLoaded]).then(([, mod]) => {
      if (mod && typeof mod.init === 'function') {
        mod.init(container);
      }
    });
  }

  static loadAll() {
    const names = Object.keys(COMPONENT_REGISTRY);
    return Promise.all(names.map(name => this.load(name)));
  }

  static startObserver() {
    if (observer) return;
    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node;
          const component = el.getAttribute?.('data-component');
          if (component) {
            this.load(component, el);
          }
          el.querySelectorAll?.('[data-component]').forEach((child) => {
            const comp = child.getAttribute('data-component');
            if (comp) this.load(comp, child);
          });
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  static _loadCSS(relativePath) {
    if (loadedCSS.has(relativePath)) return Promise.resolve();
    loadedCSS.add(relativePath);

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${BASE_CSS_PATH}/${relativePath}`;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${relativePath}`));
      document.head.appendChild(link);
    });
  }

  static async _loadJS(relativePath, name) {
    if (loadedJS.has(relativePath)) return modulesCache[name] || null;
    loadedJS.add(relativePath);

    try {
      const module = await import(`${BASE_JS_PATH}/${relativePath}`);
      modulesCache[name] = module;
      return module;
    } catch (e) {
      loadedJS.delete(relativePath);
      throw new Error(`Failed to load JS: ${relativePath} — ${e.message}`);
    }
  }

  static getRegistry() {
    return { ...COMPONENT_REGISTRY };
  }
}

export default ComponentLoader;
