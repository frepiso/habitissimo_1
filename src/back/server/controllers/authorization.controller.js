'use strict';
const jwtSecret = require('../config/env.config.js').jwt_secret;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = (req, res) => {
  try {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.userId + jwtSecret).digest('base64');
    const b = new Buffer(hash);
    req.body.refreshKey = salt;
    const accessToken = jwt.sign(req.body, jwtSecret);
    const refreshToken = b.toString('base64');
    res.status(201).send({accessToken: accessToken, refreshToken: refreshToken});
  } catch (err) {
    res.status(500).send({errors: 'Login failed'});
  }
};

exports.refresh_token = (req, res) => {
  try {
    req.body = req.jwt;
    const token = jwt.sign(req.body, jwtSecret);
    res.status(201).send({id: token});
  } catch (err) {
    res.status(500).send({errors: err});
  }
};
