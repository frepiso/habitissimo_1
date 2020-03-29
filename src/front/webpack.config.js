const prodConfig = require('./webpack.config.prod.js');
const devConfig = require('./webpack.config.dev.js');
function webpackEnviromentSelector(env) {
  return env.production ? prodConfig : devConfig;
}
module.exports = webpackEnviromentSelector;
