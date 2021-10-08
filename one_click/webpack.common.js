const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack  = require('webpack');
const dotenv  = require('dotenv');

dotenv.config();

module.exports = {
  entry: {
    checkout: './src/index.js',
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './public'),
  },
};
