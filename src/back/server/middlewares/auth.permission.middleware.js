'use strict';
const ADMIN_PERMISSION = require('../config/env.config')['permissionLevels']['ADMIN'];

exports.minimumPermissionLevelRequired = (requiredPermissionLevel) => {
  return (req, res, next) => {
    if (req.jwt === undefined || req.jwt.permissionLevel === undefined) {
      return res.status(403).send({err: 'Wrong permissions'});
    }
    const userPermissionLevel = parseInt(req.jwt.permissionLevel);
    if (userPermissionLevel === ADMIN_PERMISSION || userPermissionLevel === requiredPermissionLevel) {
      return next();
    } else {
      return res.status(403).send({err: 'Wrong permissions'});
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  if (req.jwt === undefined || req.jwt.permissionLevel === undefined) {
    return res.status(403).send({err: 'Wrong permissions'});
  }
  const userPermissionLevel = parseInt(req.jwt.permissionLevel);
  const userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (userPermissionLevel === ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send({err: 'You are not authorized'});
    }
  }
};
