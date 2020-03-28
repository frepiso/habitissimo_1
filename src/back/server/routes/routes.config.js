'use strict';
const CategoriesRouter = require('./categories.routes');
const ValidatorRouter = require('./validator.routes');

exports.routesConfig = (app) => {
  CategoriesRouter.routesConfig(app);
  ValidatorRouter.routesConfig(app);
};
