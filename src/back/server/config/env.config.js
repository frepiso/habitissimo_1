'use strict';

module.exports = {
  'port': 3000,
  'appEndpoint': 'http://localhost:3000',
  'apiEndpoint': 'http://localhost:3000',
  'db': 'mongodb://db:27017/docker-container-user-mongo',
  'jwt_secret': 'myS33!!creeeT',
  'jwt_expiration_in_seconds': 36000,
  'environment': 'dev',
  'permissionLevels': {
    'NORMAL_USER': 1,
    'ADMIN': 2048,
  },
};
