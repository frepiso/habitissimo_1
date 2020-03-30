'use strict';
const UserModel = require('../models/users.model');

exports.insert = (req, res) => {
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
  UserModel.patchById(req.body.id, req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong user data'});
      });
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.body.id)
      .then((result)=>{
        res.status(204).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Error removing user'});
      });
};
