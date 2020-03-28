'use strict';
const ValidatorController = require('../controllers/validator.controller');

exports.routesConfig = (app) => {
  app.get('/validator/:email', [
    ValidatorController.validateEmail,
  ]);
};
