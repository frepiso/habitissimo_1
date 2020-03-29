'use strict';
const mongoose = require('mongoose');
const config = require('./env.config');

exports.conn = (app) => {
  // mongoose.Promise = global.Promise;
  mongoose
      .connect(config.db, {useNewUrlParser: true})
      .then(() => console.log('MongoDB Connected'))
      .catch((err) => console.log(err));
};
