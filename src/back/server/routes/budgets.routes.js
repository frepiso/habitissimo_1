'use strict';
const config = require('../config/env.config');
const BudgetsController = require('../controllers/budgets.controller');
const BudgetValidationMiddleware = require('../middlewares/budget.validation.middleware');
const BudgetUserMiddleware = require('../middlewares/budget.user.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');

const ADMIN = config.permissionLevels.ADMIN;
const FREE = config.permissionLevels.USER;

exports.routesConfig = (app) => {
  app.post('/api/budgets', [
    BudgetValidationMiddleware.hasValidFields,
    BudgetUserMiddleware.handleNewBudgetUser,
    BudgetsController.insert,
  ]);
  app.get('/api/budgets', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    BudgetsController.list,
  ]);
  app.get('/api/budgets/:budgetId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    BudgetsController.getById,
  ]);
  app.patch('/api/budgets/:budgetId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    BudgetsController.patchById,
  ]);
  app.delete('/api/budgets/:budgetId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    BudgetsController.removeById,
  ]);
};
