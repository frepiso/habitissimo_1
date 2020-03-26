'use strict';
// storage
import Storage from './storage';
import Render from './render';
import Utils from './lib/utils';

const storage = new Storage();

const Router = async () => {
  const url = Utils.requestURL();
  const request = Utils.parseURL(url);
  const parsedURL = (request.resource ? '/' + request.resource : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? '/' + request.verb : '');
  const page = !request.resource ? storage.getPage() : request.resource;
  const step = !request.id ? storage.getStep() : request.id;

  storage.setPage(page);
  storage.setStep(step);

  await Render.render(page);
};

export default Router;
