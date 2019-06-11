const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        resolve: {
          extensions: ['.css', '.scss', '.sass'],
        },
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: ['bower_components'],
            },
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_ENTRYPOINT: JSON.stringify(process.env.REACT_APP_API_ENTRYPOINT),
        REACT_APP_MARKETPLACE_EMAIL: JSON.stringify(process.env.REACT_APP_MARKETPLACE_EMAIL),
        REACT_APP_MARKETPLACE_LOCATION: JSON.stringify(process.env.REACT_APP_MARKETPLACE_LOCATION),
        REACT_APP_MARKETPLACE_NAME: JSON.stringify(process.env.REACT_APP_MARKETPLACE_NAME),
        REACT_APP_MARKETPLACE_PHONE: JSON.stringify(process.env.REACT_APP_MARKETPLACE_PHONE),
        REACT_APP_NODE_API_ENTRYPOINT: JSON.stringify(process.env.REACT_APP_NODE_API_ENTRYPOINT)
      },
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: [
      '.js',
      '.css',
      '.scss',
      '.tsx',
      '.ts'
    ]
  },
  output: {
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
