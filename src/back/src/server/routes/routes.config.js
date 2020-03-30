'use strict';
const UsersRouter = require('./users.routes');
const BudgetsRouter = require('./budgets.routes');
const CategoriesRouter = require('./categories.routes');
const ValidatorRouter = require('./validator.routes');

exports.routesConfig = (app) => {
  UsersRouter.routesConfig(app);
  BudgetsRouter.routesConfig(app);
  CategoriesRouter.routesConfig(app);
  ValidatorRouter.routesConfig(app);
};
