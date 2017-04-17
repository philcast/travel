const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
  return {
    entry: {
      'main': './src/main.tsx'
    },
    output: {
      path: path.join(__dirname, '/../dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      modules: [path.join(__dirname, '/../src'), 'node_modules']
    },
    module: {
      loaders: [
        {
          test: /\.(ts|tsx)$/,
          loaders: ['ts-loader'],
          exclude: [/\.(spec|e2e)\.(ts|tsx)$/]
        },
        {
          test: /main.css$/,
          loader: ExtractTextPlugin.extract({
            loader: 'css-loader?importLoaders=1!postcss-loader'
          })
        },
        {
          test: /(component[\/\\]).*\.css$/,
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIndentName: '[name]_[local]_[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader'
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'file-loader?limit=100000'
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new ExtractTextPlugin('[name].bundle.css')
    ]
  };
}
