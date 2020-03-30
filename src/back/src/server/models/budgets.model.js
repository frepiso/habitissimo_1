'use strict';
const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');
require('mongoose').Promise = Promise;
const objectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const statusType = ['pendiente', 'publicada', 'descartada'];
exports.statusType = statusType;

const budgetSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  subcategory: {
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
budgetSchema.plugin(mongoosePatchUpdate);

const Budget = mongoose.model('Budgets', budgetSchema);

exports.create = (budgetData) => {
  return new Promise((resolve, reject) => {
    const budget = new Budget({
      title: budgetData.title,
      description: budgetData.description,
      category: budgetData.category,
      subcategory: budgetData.subcategory,
      date: budgetData.date,
      preference: budgetData.preference,
      address: budgetData.address,
      status: statusType[0],
      email: budgetData.email,
    });
    return budget.save((err, newBudget) => {
      if (err) return reject(err);
      return resolve(newBudget);
    });
  });
};

exports.list = () => {
  return new Promise((resolve, reject) => {
    return Budget.find({}, (err, budgets) => {
      if (err) return reject(err);
      return resolve(budgets);
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

exports.patchById = (id, budgetData) => {
  return new Promise((resolve, reject) => {
    const query = {_id: objectId(id)};
    const updateParams = budgetData;
    const protectedKeys = ['email'];
    const selectedKeys = '';
    return Budget.patchUpdate(query, updateParams, protectedKeys, selectedKeys, (err, updated) => {
      if (err) return reject(err);
      return resolve(updated);
    });
  });
};

exports.removeById = (id) => {
  return new Promise((resolve, reject) => {
    return Budget.deleteOne({_id: id}, (err, deletedCount) => {
      if (err) reject(err);
      return resolve(deletedCount);
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
