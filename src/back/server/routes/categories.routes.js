'use strict';
const CategoriesController = require('../controllers/categories.controller');

exports.routesConfig = (app) => {
  app.get('/api/categories/:categoryName', [
    CategoriesController.getByName,
  ]);
};
