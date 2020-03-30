'use strict';
const BudgetModel = require('../models/budgets.model');


exports.populate = (req, res) => {
  BudgetModel.populate()
      .then((result) => {
        res.status(200).send(result);
      });
};

exports.insert = (req, res) => {
  console.log(req.body);
  BudgetModel.create(req.body)
      .then((result) => {
        res.status(201).send({id: result._id});
      })
      .catch((err) => {
        res.status(403).send({err: 'Error creating budget'});
      });
};

exports.list = (req, res) => {
  BudgetModel.list()
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
exports.publish = (req, res, next) => {

};

exports.discard = (req, res, next) => {

};

exports.patchById = (req, res) => {
  BudgetModel.patchById(req.params.budgetId, {
    title: req.body.title,
    description: req.body.description,
    subcategory: req.body.subcategory,
  })
      .then((result) => {
        res.status(201).send({});
      })
      .catch((err) => {
        res.status(403).send({err: 'Wrong budget data'});
      });
};

exports.removeById = (req, res) => {
  BudgetModel.removeById(req.params.budgetId)
      .then((result)=>{
        res.status(204).send({});
      })
      .catch((err) => {
        res.status(403).send({err: 'Error removing budget'});
      });
};
