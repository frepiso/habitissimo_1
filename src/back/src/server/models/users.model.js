'use strict';
const mongoose = require('mongoose');
const mongoosePatchUpdate = require('mongoose-patch-update');
require('mongoose').Promise = Promise;
const objectId = mongoose.Types.ObjectId;
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
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  permissionLevel: {
    type: Number,
    required: false,
  },
});
userSchema.plugin(mongoosePatchUpdate);

const User = mongoose.model('Users', userSchema);

exports.create = (userData) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      password: '',
      permissionLevel: 1,
    });
    return user.save((err, newUser) => {
      if (err) return reject(err);
      return resolve(newUser);
    });
  });
};

exports.list = (perPage, page, email = {}) => {
  return new Promise((resolve, reject) => {
    return User.find(email)
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

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    return User.findById(id, {password: 0, permissionLevel: 0}, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

exports.patchById = (id, userData) => {
  return new Promise((resolve, reject) => {
    const query = {_id: objectId(id)};
    const updateParams = userData;
    const protectedKeys = ['email'];
    const selectedKeys = '';
    return User.patchUpdate(query, updateParams, protectedKeys, selectedKeys, (err, updated) => {
      if (err) return reject(err);
      return resolve(updated);
    });
  });
};

exports.removeById = (id) => {
  return new Promise((resolve, reject) => {
    return User.deleteOne({_id: id}, (err, deletedCount) => {
      if (err) reject(err);
      return resolve(deletedCount);
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
