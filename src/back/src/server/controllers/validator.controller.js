'use strict';
const Utils = require('../lib/utils');

const isValidEmail = async (email) => {
  return Utils.isValidEmail(email);
};

exports.validateEmail = (req, res) => {
  isValidEmail(req.params.email)
      .then((result) => {
        res.status(200).send(result);
      });
};
