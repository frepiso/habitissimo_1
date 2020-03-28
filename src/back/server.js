'use strict';
const express = require('express');
const config = require('./server/config/app.config');
const router = require('./server/routes/routes.config');
// const conn = require('./server/config/conn.config');
const app = express();

config.appConfig(app);
router.routesConfig(app);
// conn.conn(app);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.settings.env);
});
