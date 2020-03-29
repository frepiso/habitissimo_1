'use strict';
const AuthRouter = require('./auth.routes');
const UsersRouter = require('./users.routes');
const BudgetsRouter = require('./budgets.routes');
const CategoriesRouter = require('./categories.routes');
const ValidatorRouter = require('./validator.routes');

exports.routesConfig = (app) => {
  AuthRouter.routesConfig(app);
  UsersRouter.routesConfig(app);
  BudgetsRouter.routesConfig(app);
  CategoriesRouter.routesConfig(app);
  ValidatorRouter.routesConfig(app);
};
