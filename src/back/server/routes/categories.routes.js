'use strict';
const CategoriesController = require('../controllers/categories.controller');

exports.routesConfig = (app) => {
  app.get('/categories/:categoryId', [
    CategoriesController.getById,
  ]);
};
