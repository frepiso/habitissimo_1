'use strict';
import Utils from '../../lib/utils';
import Navbar from './navbar.js';
import Storage from '../../Storage';

const storage = new Storage();

const keys = {
  'register_button': '¡Regístrate gratis!',
  'header_msg': '¿Eres autónomo o tienes una empresa y quieres conseguir clientes?',
};

const Header = {
  render: async () => {
    return `
      <div class="ss-header">
        <div class="ss-header-container ss-container ">
          <div class="ss-header-logo">
            <a id="header-button" href="/"><div class="ss-header-logo-text"></div></a>
          </div>
          <div class="ss-header-msg">
            <div class="ss-header-msg-text">${keys.header_msg}</div>
          </div>
          <div class="ss-header-register">
            <a id="register_button" class="ss-header-register-button" href="/">${keys.register_button}</a>
          </div>
        </div>
        <div id="nav_container"></div>
      </div>
    `;
  },
  after_render: async () => {
    document.getElementById('header-button').addEventListener('click', (e) => {
      e.preventDefault();
      const url = Utils.createURL('home', '0');
      Utils.saveStorage(storage);
      Utils.goto(url);
    });

    document.getElementById('register_button').addEventListener('click', (e) => {
      e.preventDefault();
    });

    const container = null || document.getElementById('nav_container');
    container.innerHTML = await Navbar.render();
    await Navbar.after_render();
  },
};

export default Header;
