'use strict';
const Utils = require('../lib/utils');
const BudgetModel = require('../models/budgets.model');

exports.editIsEnabled = (req, res, next) => {
  return BudgetModel.findById(req.body.id)
      .then((budget) => {
        if (budget[0]) {
          if (req.body.status === BudgetModel.statusType[0]) {
            return next(req);
          } else {
            return res.status(403).send({err: 'Forbidden for no pending budget'});
          }
        }
      })
      .catch((err) => {
        return res.status(403).send({err: 'Error handling user budget'});
      });
};

exports.publishIsEnabled = (req, res, next) => {
  return BudgetModel.findById(req.body.id)
      .then((budget) => {
        if (budget[0]) {
          if (budget.status === BudgetModel.statusType[0] && req.body.title !== '' & req.body.subcategory !== '') {
            return next();
          } else {
            return res.status(403).send({err: 'Forbidden for no pending budget'});
          }
        }
      })
      .catch((err) => {
        return res.status(403).send({err: 'Error handling user budget'});
      });
};

exports.discardIsEnabled = (req, res, next) => {
  return BudgetModel.findById(req.body.id)
      .then((budget) => {
        if (budget[0]) {
          if (budget.status !== BudgetModel.statusType[3]) {
            return next();
          } else {
            return res.status(403).send({err: 'Forbidden budget already discarded'});
          }
        }
      })
      .catch((err) => {
        return res.status(403).send({err: 'Error handling user budget'});
      });
};

exports.hasValidFields = (req, res, next) => {
  const errors = [];
  if (req.body) {
    if (!req.body.email) {
      errors.push('Missing email field');
    }
    if (!Utils.isValidEmail(req.body.email)) {
      errors.push('Invalid email field');
    }
    if (!req.body.description) {
      errors.push('Missing description field');
    }
    if (!req.body.category) {
      errors.push('Missing category field');
    }
    if (!req.body.name) {
      errors.push('Missing name field');
    }
    if (!req.body.phone) {
      errors.push('Missing phone field');
    }
    if (!Utils.isValidPhone(req.body.phone)) {
      errors.push('Invalid phone field');
    }

    if (errors.length) {
      return res.status(400).send({errors: errors.join(',')});
    } else {
      return next();
    }
  } else {
    return res.status(400).send({errors: 'Missing fields'});
  }
};
