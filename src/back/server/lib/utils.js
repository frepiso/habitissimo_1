'use strict';

exports.isValidEmail = (email) => {
  const regexMailPattern = new RegExp(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/);
  const regexForbiddenPattern = new RegExp(/[\w\-\.]+@([\w\-\.]+\.)*((hotmail))\.[a-z]{2,4}/);
  return regexMailPattern.test(email) && !regexForbiddenPattern.test(email);
};

exports.isValidPhone = (value) => {
  return value.match(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/);
};
