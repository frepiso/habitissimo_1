'use strict';
// storage
import Storage from './Storage';
import Render from './render';
import Utils from './lib/utils';

const storage = new Storage();

const Router = async () => {
  const url = Utils.requestURL();
  const request = Utils.parseURL(url);
  const page = !request.resource ? storage.getPage() : request.resource;
  const step = !request.id ? storage.getStep() : request.id;

  storage.setPage(page);
  storage.setStep(step);
  Utils.saveStorage();

  await Render.render();
  await Render.after_render();
};

export default Router;
