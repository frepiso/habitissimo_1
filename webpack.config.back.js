const path = require('path');
const nodeExternals = require('webpack-node-externals');
const basePath = __dirname;
const distPath = 'dist/back';

module.exports = {
  target: "node",
  mode: 'production',
  entry: {
    app: ["./src/back/server.js"]
  },
  output: {
    path: path.join(basePath, distPath),
    filename: "server.js"
  },
  externals: [nodeExternals()],
};
