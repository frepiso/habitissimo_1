'use strict';

const Utils = {
  requestURL: () => {
    return location.hash.slice(1).toLowerCase() || '/';
  },
  parseURL: (url) => {
    const r = url.split('/');
    return {
      resource: r[1],
      id: r[2],
      verb: r[3],
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
  saveStorage: (storage) => {
    localStorage.setItem('HabittisimoStorage', JSON.stringify({router: storage.getRouter(), budget: storage.getBudget(),}));
  },
};

export default Utils;
