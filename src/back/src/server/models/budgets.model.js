'use strict';
const fs = require('fs');
const mongoose = require('mongoose');
require('mongoose').Promise = Promise;
const Schema = mongoose.Schema;

exports.statusType = ['pendiente', 'publicada', 'descartada'];

const budgetSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  cateogry: {
    type: String,
    required: false,
  },
  subcateogry: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  preference: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Budget = mongoose.model('Budgets', budgetSchema);

exports.populate = (req, res) => {
  return fs.readFile('../mocks/budgets.json', 'utf8', (err, data) => {
    if (err) return reject(err);
    const dataFromFile = JSON.parse(data);
    dataFromFile.forEach((obj) => {
      const budget = new Budget(obj);
      budget.save((err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    });
  });
};

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    return Budget.findOne({email: email}, (err, budget) => {
      if (err) return reject(err);
      return resolve(budget);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    return Budget.findById(id, (err, budget) => {
      if (err) return reject(err);
      return resolve(budget);
    });
  });
};

exports.create = (budgetData) => {
  return new Promise((resolve, reject) => {
    const budget = new Budget({
      title: budgetData.title,
      description: budgetData.description,
      cateogry: budgetData.cateogry,
      subcateogry: budgetData.subcateogry,
      date: budgetData.date,
      preference: budgetData.preference,
      address: budgetData.address,
      status: statusType[0],
      email: budgetData.email,
    });
    return budget.save((err, newbudget) => {
      if (err) return reject(err);
      return resolve(newbudget);
    });
  });
};

exports.list = (page) => {
  return new Promise((resolve, reject) => {
    return Budget.find({}, (err, budgets) => {
      if (err) return reject(err);
      return resolve(budgets);
    });
  });
};

exports.patchById = (id, budgetData) => {
  return new Promise((resolve, reject) => {
    return User.findById(id, (err, budget) => {
      if (err) return reject(err);
      for (let i in budgetData) { // eslint-disable-line
        if (['title', 'description', 'subcateogry', 'status'].includes(i)) {
          budget[i] = budgetData[i];
        }
      }
      budget.save((err, updatedBudget) => {
        if (err) return reject(err);
        return resolve(updatedBudget);
      });
    });
  });
};

exports.removeById = (budgetId) => {
  return new Promise((resolve, reject) => {
    return Budget.remove({_id: budgetId}, (err, profile) => {
      if (err) reject(err);
      resolve(profile);
    });
  });
};
