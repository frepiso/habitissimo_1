'use strict';
const UsersController = require('../controllers/users.controller');

exports.routesConfig = (app) => {
  app.post('/api/users', [
    UsersController.insert,
  ]);
  app.get('/api/users', [
    UsersController.list,
  ]);
  app.get('/api/users/:userId', [
    UsersController.getById,
  ]);
  app.patch('/api/users', [
    UsersController.patchById,
  ]);
  app.delete('/api/users', [
    UsersController.removeById,
  ]);
};
