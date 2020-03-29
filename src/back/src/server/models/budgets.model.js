'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    Budget.findOne({email: email}, (err, budget) => {
      if (err) reject(err);
      resolve(budget);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    Budget.findById(id, (err, budget) => {
      if (err) reject(err);
      resolve(budget);
    });
  });
};

exports.create = (budgetData) => {
  return new Promise((resolve, reject) => {
    const budget = new Profile(budgetData);
    budget.save((err, newbudget) => {
      if (err) return reject(err);
      resolve(newbudget);
    });
  });
};

exports.list = (page) => {
  return new Promise((resolve, reject) => {
    Budget.find({}, (err, budgets) => {
      if (err) reject(err);
      resolve(budgets);
    });
  });
};

exports.patchById = (id, budgetata) => {
  return new Promise((resolve, reject) => {
    Budget.findById(id, (err, budget) => {
      if (err) reject(err);
      for (let i in budgetData) { // eslint-disable-line
        if (['title', 'description', 'category', 'subcategory', 'date', 'preference'].includes(i)) {
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
    Budget.remove({_id: budgetId}, (err, profile) => {
      if (err) reject(err);
      resolve(profile);
    });
  });
};
