'use strict';
import Storage from './storage';
// components views
import Header from './views/components/header';
import Footer from './views/components/footer';
// pages views
import Home from './views/pages/home';
import Error404 from './views/pages/error404';
import Reforms from './views/pages/reforms';
import Building from './views/pages/building';
import Move from './views/pages/move';
import Painting from './views/pages/painting';
import Brickwork from './views/pages/brickwork';
import Parquet from './views/pages/parquet';
import Others from './views/pages/others';

const storage = new Storage();

const routes = {
  'home': Home,
  'reformas': Reforms,
  'construccion': Building,
  'mudanza': Move,
  'pintura': Painting,
  'obra': Brickwork,
  'parque': Parquet,
  'otros': Others,
};

const Render = {
  render: async () => {
    const url = storage.getPage();
    const header = null || document.getElementById('header_container');
    const footer = null || document.getElementById('footer_container');
    const content = null || document.getElementById('page_container');
    const page = routes[url] ? routes[url] : Error404;

    header.innerHTML = await Header.render();
    await Header.after_render();

    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    content.innerHTML = await page.render();
    await page.after_render();
  }
};

export default Render;
