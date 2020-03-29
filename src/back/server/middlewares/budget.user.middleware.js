'use strict';
const UserModel = require('../models/users.model');

exports.handleNewBudgetUser = (req, res, next) => {
  UserModel.findByEmail(req.body.budget.email)
      .then((user) => {
        if (!user[0]) {
          // no encontrado
          // se creará un nuevo usuario con el email, nombre y telefono
          console.log('usuario NO encontrado');
        } else {
          // encontrado
          // se guardará el nombre y telefono
          console.log('usuario SI encontrado');
        }
        return next();
      });
};
