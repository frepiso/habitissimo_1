'use strict';
const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
  req.body.password = salt + '$' + hash;
  req.body.permissionLevel = 1;
  UserModel.create(req.body)
      .then((result) => {
        res.status(201).send({id: result._id});
      })
      .catch((err) => {
        res.status(403).send({err: 'Error creating user'});
      });
};

exports.list = (req, res) => {
  UserModel.list()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong get list'});
      });
};

exports.listPerPage = (req, res) => {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  UserModel.listPerPage(limit, page)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong get list'});
      });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong get user'});
      });
};

exports.patchById = (req, res) => {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
  }
  UserModel.patchById(req.params.userId, req.body)
      .then((result) => {
        res.status(201).send({});
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong user data'});
      });
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId)
      .then((result)=>{
        res.status(204).send({});
      })
      .catch((err) => {
        res.status(403).send({err: 'Error removing user'});
      });
};
