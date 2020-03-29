'use strict';
import Config from '../config/app.config';
import Storage from '../Storage';

const storage = new Storage();

const Utils = {
  requestURL: () => {
    return location.hash.slice(1).toLowerCase() || '/';
  },
  parseURL: (url) => {
    const r = url.split('/');
    return {
      resource: r[1],
      id: r[2],
    };
  },
  createURL: (page, step) => {
    return '/#/' + page + '/' + step;
  },
  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  getNextMonth: (locale) => {
    const now = new Date();
    const nextMonth = now.getMonth() === 11 ?
      new Date(now.getFullYear() + 1, 0, 1) :
      new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString(locale);
  },
  goto: (url) => {
    window.location = url;
  },
  saveStorage: () => {
    localStorage.setItem(Config.storage_name, JSON.stringify({router: storage.getRouter(), budget: storage.getBudget()}));
  },
  getData: async (req, url) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    };
    if (storage.getAccesToken()) {
      options.headers['Authorization'] = storage.getAccesToken();
    }
    try {
      const response = await fetch(url + req, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('Error getting data server', err);
    }
  },
  postData: async (req, url) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    };
    if (storage.getAccesToken()) {
      options.headers['Authorization'] = storage.getAccesToken();
    }
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('Error getting data server', err);
    }
  },
  toggle: ($el) => {
    $el.style.display = window.getComputedStyle($el).display === 'block' ? 'none' : 'block';
  },
  toogleClass: ($el, _class) => {
    if ($el.classList.contains(_class)) {
      $el.classList.remove(_class);
    } else {
      $el.classList.add(_class);
    }
  },
  removeClass: (el, _class) => {
    if (el.target.classList.contains(_class)) {
      el.target.classList.remove(_class);
    }
  },
  validation: ($el) => {
    const rules = {
      required: (value) => {
        return value !== '';
      },
      phone: (value) => {
        return value.match(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/);
      },
      email: (value) => {
        return value.match(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/);
      },
    };
    const errors = [];
    const attr = $el.dataset.validation;
    const toValidate = attr ? attr.split(' ') : '';
    toValidate.forEach((rule, idx) => {
      if (!rules[rule]($el.value)) {
        errors.push('Invalid rule ' + rule + ' on ' + $el.name);
      }
    });
    console.log('errors', errors);
    return !errors.length;
  },
};

export default Utils;
