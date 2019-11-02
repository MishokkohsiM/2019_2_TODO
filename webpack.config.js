const webpack = require('webpack');
const path = require('path');
const WorkBoxPlugin = require('workbox-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outPath = path.join(__dirname, '/dist');


module.exports = {
  entry: {
    main: [
      './src/module/pokerSolver/PokerSolver.js',
      // '/src/handlebars.js',
      './src/main.js',
      './src/main.css',
    ],
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
  },

  target: 'web',
  resolve: {
    extensions: ['.js'],
    mainFields: ['browser', 'main'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {loader: 'url-loader?limit=10000'},
        ],
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8000,
  },
  watch: true,
  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),

    new CopyWebpackPlugin([
        {from: path.join(__dirname, 'src/assets'), to: path.join(outPath, 'assets')},
    ]),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
      // excludes: ['**/.*', '**/*.map', '*.html'],
      
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
  },
};
