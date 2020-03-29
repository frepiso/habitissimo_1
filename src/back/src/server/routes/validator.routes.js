'use strict';
const ValidatorController = require('../controllers/validator.controller');

exports.routesConfig = (app) => {
  app.get('/api/validator/:email', [
    ValidatorController.validateEmail,
  ]);
};
