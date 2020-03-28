'use strict';
import './css/app.scss';
import Config from './js/config/app.config';
import Storage from './js/Storage.js';
import Router from './js/router.js';

const storage = new Storage();

const bindEvents = () => {
  window.addEventListener('hashchange', Router);
  window.addEventListener('load', Router);
};

const retriveLocalStorage = () => {
  const retrievedObject = localStorage.getItem(Config.storage_name);
  if (retrievedObject) {
    const parseRetriveObject = JSON.parse(retrievedObject);
    storage.setRouter(parseRetriveObject.router);
    storage.setBudget(parseRetriveObject.budget);
  }
};

const init = () => {
  retriveLocalStorage();
  bindEvents();
};

init();
