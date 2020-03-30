'use strict';
const BudgetsController = require('../controllers/budgets.controller');
const BudgetRulesMiddleware = require('../middlewares/budget.rules.middleware');

exports.routesConfig = (app) => {
  app.post('/api/budgets', [
    BudgetRulesMiddleware.handleUser,
    BudgetsController.insert,
  ]);
  app.get('/api/budgets', [
    BudgetsController.list,
  ]);
  app.get('/api/budgets/:budgetId', [
    BudgetsController.getById,
  ]);
  app.patch('/api/budgets', [
    BudgetRulesMiddleware.editIsEnabled,
    BudgetsController.patchById,
  ]);
  app.patch('/api/budgets_publish', [
    BudgetRulesMiddleware.publishIsEnabled,
    BudgetsController.patchById,
  ]);
  app.patch('/api/budgets_discard', [
    BudgetRulesMiddleware.discardIsEnabled,
    BudgetsController.patchById,
  ]);
  app.delete('/api/budgets', [
    BudgetsController.removeById,
  ]);
};
