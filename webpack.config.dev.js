const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const basePath = __dirname;
const distPath = 'dist/front';
const indextInput = './src/front/index.html';
const indexOutput = 'index.html';
const assetsOutput = 'assets/css/';
const frontConfig = {
  target: "web",
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.ts'],
  },
  entry: {
    app: ['@babel/polyfill', './src/front/index.js'],
  },
  output: {
    path: path.join(basePath, distPath),
    filename: '[name]_[chunkhash].js',
  },
  devServer: {
    contentBase: path.join(basePath, distPath),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtract.loader,
          { loader: 'css-loader', options: { sourceMap: true, } },
          { loader: 'postcss-loader', options: { sourceMap: true, } },
          { loader: 'sass-loader', options: { sourceMap: true,} },
        ],
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtract.loader,
          { loader: 'css-loader', options: { sourceMap: true, } },
          { loader: 'postcss-loader', options: { sourceMap: true, } },
          { loader: 'less-loader', options: { sourceMap: true, } },
        ],
      },
      {
        test: /\.(woff|woff2|otf|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              sourceMap: true,
              limit: 1000,
              name: '[name].[ext]',
              outputPath: assetsOutput.concat('fonts'),
              publicPath: 'fonts',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              sourceMap: true,
              limit: 50000,
              name: '[name].[ext]',
              outputPath: assetsOutput.concat('imgs'),
              publicPath: 'imgs',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: indexOutput,
      template: indextInput,
    }),
    new MiniCSSExtract({
      filename: assetsOutput.concat('[name]_[chunkhash].css'),
    }),
  ],
};
module.exports = frontConfig;
