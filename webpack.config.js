const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const res = p => path.resolve(__dirname, p);

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const outPath = res('./dist');

module.exports = {
  name: "client",
  devtool: false,
  target: "web",
  mode,
  entry: {
    main: [res('./src/index.js')],
  },
  output: {
    publicPath: '/static-landing-page/dist',
    path: outPath,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: /\/src/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: false,
            },
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: [".js",],
    symlinks: false,
  },
  /*
  optimization: {
    minimize: false,
  },
  */
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new CopyWebpackPlugin({
      patterns: [
      {
        from: "index.html",
        to: outPath,
      },
    ]}),
  ],
};
