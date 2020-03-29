'use strict';
const config = require('../config/env.config');
const UsersController = require('../controllers/users.controller');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');

const ADMIN = config.permissionLevels.ADMIN;
const FREE = config.permissionLevels.USER;

exports.routesConfig = (app) => {
  app.post('/api/users', [
    UsersController.insert,
  ]);
  app.get('/api/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UsersController.list,
  ]);
  app.get('/api/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.getById,
  ]);
  app.patch('/api/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.patchById,
  ]);
  app.delete('/api/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UsersController.removeById,
  ]);
};
