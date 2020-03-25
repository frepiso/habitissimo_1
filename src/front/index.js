'use strict';
import './css/app.scss';
import Router from './js/router.js';

const bindEvents = () => {
  window.addEventListener('hashchange', Router);
  window.addEventListener('load', Router);
};

const init = () => {
  bindEvents();
};

init();
