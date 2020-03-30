'use strict';
const UserModel = require('../models/users.model');

exports.handleNewBudgetUser = (req, res, next) => {
  return UserModel.findByEmail(req.body.email)
      .then((user) => {
        if (!user[0]) {
          UserModel.create(req.body)
              .then(() => {
                return next();
              })
              .catch((err) => {
                return res.status(403).send({err: 'Error adding user budget'});
              });
        } else {
          UserModel.patchById(req.body.email, req.body)
              .then(() => {
                return next();
              })
              .catch((err) => {
                return res.status(403).send({err: 'Error updating user budget'});
              });
        }
        // return next();
      }).
      catch((err) => {
        return res.status(403).send({err: 'Error handling user budget'});
      });
};
