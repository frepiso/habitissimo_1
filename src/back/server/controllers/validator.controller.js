'use strict';

const isValidEmail = async (email) => {
  const regexMailPattern = new RegExp(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/);
  const regexForbiddenPattern = new RegExp(/[\w\-\.]+@([\w\-\.]+\.)*((hotmail))\.[a-z]{2,4}/);
  return regexMailPattern.test(email) && !regexForbiddenPattern.test(email);
};

exports.validateEmail = (req, res) => {
  isValidEmail(req.params.email)
      .then((result) => {
        res.status(200).send(result);
      });
};
