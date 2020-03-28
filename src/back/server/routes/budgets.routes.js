'use strict';
const RouterController = require('../controllers/budgets.controller');

exports.routesConfig = (app) => {
  app.post('/budgets', [
    RouterController.insert,
  ]);
  app.get('/budgets', [
    RouterController.list,
  ]);
  app.get('/budgets/:budgetId', [
    RouterController.getById,
  ]);
  app.patch('/budgets/:budgetId', [
    RouterController.patchById,
  ]);
  app.delete('/budgets/:budgetId', [
    RouterController.removeById,
  ]);
};
