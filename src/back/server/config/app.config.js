'use strict';
const bodyParser = require('body-parser');
const config = require('./env.config');

exports.appConfig = (app) => {
  app.set('port', process.env.PORT || config.port);

  app.set('json spaces', 4);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    } else {
      return next();
    }
  });
};
