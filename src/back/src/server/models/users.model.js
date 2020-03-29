'use strict';
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: false,
  // },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  permissionLevel: {
    type: Number,
    required: false,
  },
});

const User = mongoose.model('Users', userSchema);

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({email: email}, {password: 0, permissionLevel: 0}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, {password: 0, permissionLevel: 0}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

exports.create = (userData) => {
  return new Promise((resolve, reject) => {
    const user = new Profile(userData);
    user.save((err, newuser) => {
      if (err) return reject(err);
      resolve(newuser);
    });
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find({}, {password: 0, permissionLevel: 0}, (err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  });
};

exports.listPerPage = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec((err, users) => {
          if (err) {
            reject(err);
          } else {
            resolve(users);
          }
        });
  });
};

exports.patchById = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) reject(err);
      for (let i in userData) { // eslint-disable-line
        if (['name', 'phone'].includes(i)) {
          user[i] = userData[i];
        }
      }
      user.save((err, updatedUser) => {
        if (err) return reject(err);
        return resolve(updatedUser);
      });
    });
  });
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    User.remove({_id: userId}, (err, profile) => {
      if (err) reject(err);
      resolve(profile);
    });
  });
};
