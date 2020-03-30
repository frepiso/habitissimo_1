'use strict';
const BudgetModel = require('../models/budgets.model');
const UserModel = require('../models/users.model');

exports.handleUser = (req, res, next) => {
  return UserModel.findByEmail(req.body.email)
      .then((user) => {
        if (!user) {
          UserModel.create({
            email: req.body.email,
            name: '',
            phone: req.body.phone,
            address: req.body.address,
          })
              .then(() => {
                return next();
              })
              .catch((err) => {
                return res.status(403).send({err: 'Error adding user budget'});
              });
        } else {
          UserModel.patchById(user.id, {
            phone: req.body.phone,
            address: req.body.address,
          })
              .then(() => {
                return next();
              })
              .catch((err) => {
                return res.status(403).send({err: 'Error updating user budget'});
              });
        }
      })
      .catch((err) => {
        return res.status(403).send({err: 'Error handling user budget'});
      });
};

exports.editIsEnabled = (req, res, next) => {
  return BudgetModel.findById(req.body.id)
      .then((budget) => {
        if (budget) {
          if (budget.status === BudgetModel.statusType[0]) {
            const title = !req.body.title ? budget.title : req.body.title;
            const description = !req.body.description ? budget.description : req.body.description;
            const subcategory = !req.body.subcategory ? budget.subcategory : req.body.subcategory;
            req.body = {
              id: budget.id,
              title: title,
              description: description,
              subcategory: subcategory,
            };
            return next();
          } else {
            return res.status(403).send({err: 'Forbidden for no pending budget'});
          }
        } else {
          return res.status(403).send({err: 'Error on edit budget'});
        }
      })
      .catch((err) => {
        return res.status(403).send({err: 'Error on edit budget'});
      });
};

exports.publishIsEnabled = (req, res, next) => {
  return BudgetModel.findById(req.body.id)
      .then((budget) => {
        if (budget) {
          if (budget.status === BudgetModel.statusType[0] && budget.title !== '' & budget.subcategory !== '') {
            req.body = {
              id: budget.id,
              status: BudgetModel.statusType[1],
            };
            return next();
          } else {
            return res.status(403).send({err: 'Forbidden for no pending budget or missing values'});
          }
        } else {
          return res.status(403).send({err: 'Error on publish budget'});
        }
      })
      .catch((err) => {
        return res.status(403).send({err: 'Error on publish budget'});
      });
};

exports.discardIsEnabled = (req, res, next) => {
  return BudgetModel.findById(req.body.id)
      .then((budget) => {
        if (budget) {
          if (budget.status !== BudgetModel.statusType[2]) {
            req.body = {
              id: budget.id,
              status: BudgetModel.statusType[2],
            };
            return next();
          } else {
            return res.status(403).send({err: 'Forbidden budget already discarded'});
          }
        } else {
          return res.status(403).send({err: 'Error on discard budget'});
        }
      })
      .catch((err) => {
        return res.status(403).send({err: 'Error on discard budget'});
      });
};
