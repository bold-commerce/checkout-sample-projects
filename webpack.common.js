const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack  = require('webpack');
const dotenv  = require('dotenv');

dotenv.config();

module.exports = {
  entry: {
    one_click: './one_click/src/index.js',
    single_page: './single_page/src/index.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './public'),
  },
};
