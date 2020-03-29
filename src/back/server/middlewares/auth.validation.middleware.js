'use strict';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config/env.config').jwt_secret;

exports.verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({error: 'need to pass refresh_token field'});
  }
};

exports.validRefreshNeeded = (req, res, next) => {
  const b = new Buffer(req.body.refresh_token, 'base64');
  const refreshToken = b.toString();
  const hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest('base64');
  if (hash === refreshToken) {
    req.body = req.jwt;
    return next();
  } else {
    return res.status(400).send({error: 'Invalid refresh token'});
  }
};

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      const authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send({err: 'Invalid access token'});
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).send({err: 'Invalid access token'});
    }
  } else {
    return res.status(401).send({err: 'Invalid access token'});
  }
};
