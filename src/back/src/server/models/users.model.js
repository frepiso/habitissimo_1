'use strict';
const fs = require('fs');
const mongoose = require('mongoose');
require('mongoose').Promise = Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
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

exports.populate = (req, res) => {
  return fs.readFile('../mocks/users.json', 'utf8', (err, data) => {
    if (err) return reject(err);
    const dataFromFile = JSON.parse(data);
    dataFromFile.forEach((obj) => {
      const user = new User(obj);
      user.save((err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    });
  });
};

exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    return User.findOne({email: email}, {password: 0, permissionLevel: 0}, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    return User.findById(id, {password: 0, permissionLevel: 0}, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

exports.create = (userData) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      password: '',
      permissionLevel: 1,
    });
    return user.save((err, newuser) => {
      if (err) return reject(err);
      return resolve(newuser);
    });
  });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    return User.find({}, {password: 0, permissionLevel: 0}, (err, users) => {
      if (err) return reject(err);
      return resolve(users);
    });
  });
};

exports.listPerPage = (perPage, page) => {
  return new Promise((resolve, reject) => {
    return User.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec((err, users) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(users);
          }
        });
  });
};

exports.patchById = (id, userData) => {
  return new Promise((resolve, reject) => {
    return User.findById(id, (err, user) => {
      if (err) return reject(err);
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
    return User.remove({_id: userId}, (err, profile) => {
      if (err) return reject(err);
      return resolve(profile);
    });
  });
};
