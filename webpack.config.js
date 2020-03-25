const prodConfig = require('./webpack.config.prod.js');
const devConfig = require('./webpack.config.dev.js');
const backConfig = require('./webpack.config.back.js');
function webpackEnviromentSelector(env) {
  return env.production ? prodConfig : devConfig;  
}
module.exports = [webpackEnviromentSelector, backConfig];
