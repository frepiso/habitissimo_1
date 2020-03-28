'use strict';
const CategoriesModel = require('../models/categories.model');

exports.getById = (req, res) => {
  CategoriesModel.findById(req.params.categoryId)
      .then((result) => {
        res.status(200).json(result);
      });
};
