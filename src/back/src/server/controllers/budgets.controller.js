'use strict';
const BudgetModel = require('../models/budgets.model');

exports.insert = (req, res) => {
  BudgetModel.create(req.body)
      .then((result) => {
        res.status(201).send({id: result._id});
      })
      .catch((err) => {
        res.status(403).send({err: 'Error creating budget'});
      });
};

exports.list = (req, res) => {
  const email = req.query.email ? {email: req.query.email} : {};
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  BudgetModel.list(limit, page, email)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong get list'});
      });
};

exports.getById = (req, res) => {
  BudgetModel.findById(req.params.budgetId)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong get budget'});
      });
};

exports.patchById = (req, res) => {
  BudgetModel.patchById(req.body.id, req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong budget data'});
      });
};

exports.removeById = (req, res) => {
  BudgetModel.removeById(req.body.id)
      .then((result)=>{
        res.status(204).send(result);
      })
      .catch((err) => {
        res.status(403).send({err: 'Error removing budget'});
      });
};
