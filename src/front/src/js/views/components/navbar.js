'use strict';
const keys = {
  'menu_1': 'Reformas',
  'menu_2': 'Construcción',
  'menu_3': 'Mudanza',
  'menu_4': 'Pintores',
  'menu_5': 'Albañiles',
  'menu_6': 'Parquetistas',
  'menu_7': 'Otros',
};

const Navbar = {
  render: async () => {
    return `
      <nav class="ss-nav" role="navigation" aria-label="main navigation">
        <ul class="ss-nav-menu ss-container">
          <li class="ss-nav-menu-item">
            <a href="/#/reformas" class="ss-nav-anchor">${keys.menu_1}</a>
          </li>
          <li class="ss-nav-menu-item">
            <a href="/#/construccion" class="ss-nav-anchor">${keys.menu_2}</a>
          </li>
          <li class="ss-nav-menu-item">
            <a href="/#/mudanza" class="ss-nav-anchor">${keys.menu_3}</a>
          </li>
          <li class="ss-nav-menu-item">
            <a href="/#/pintura" class="ss-nav-anchor">${keys.menu_4}</a>
          </li>
          <li class="ss-nav-menu-item">
            <a href="/#/obra" class="ss-nav-anchor">${keys.menu_5}</a>
          </li>
          <li class="ss-nav-menu-item">
            <a href="/#/parque" class="ss-nav-anchor">${keys.menu_6}</a>
          </li>
          <li class="ss-nav-menu-item">
            <a href="/#/otros" class="ss-nav-anchor">${keys.menu_7}</a>
          </li>
        </ul>
      </nav>
    `;
  },
  after_render: async () => {
  },
};

export default Navbar;
