'use strict';
const Utils = require('../lib/utils');

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
