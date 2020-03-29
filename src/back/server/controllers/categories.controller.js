'use strict';
const CategoriesModel = require('../models/categories.model');

exports.getByName = (req, res) => {
  CategoriesModel.findByName(req.params.categoryName)
      .then((result) => {
        res.status(200).json(result);
      });
};
