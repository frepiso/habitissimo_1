'use strict';
const AuthorizationController = require('../controllers/authorization.controller');
const AuthValidationMiddleware = require('../middlewares/auth.validation.middleware');
const VerifyUserMiddleware = require('../middlewares/verify.user.middleware');

exports.routesConfig = (app) => {
  app.post('/api/auth', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthorizationController.login,
  ]);

  app.post('/api/auth/refresh', [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login,
  ]);
};
