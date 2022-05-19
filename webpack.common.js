const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    single_page: './single_page/src/index.js'
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: 'css/[name].css',
  //   }),
  // ],
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
        test: /\.(css|scss)$/,
        use: [
            {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' }
            }, 'css-loader', 'sass-loader']
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
