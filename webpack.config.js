const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};
const devMode = process.env.NODE_ENV !== 'production';
const pages = ['main'];

const common = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: PATHS.build,
    filename: 'index.bundle.js',
  },
  resolve: {
    alias: {
      Base: path.resolve(__dirname, 'src/base/'),
      Fonts: path.resolve(__dirname, 'src/assets/fonts'),
      Normalize: path.resolve(__dirname, 'node_modules/normalize.scss/normalize.scss'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]',
        },
        exclude: [/fonts/],
      },

      {
        test: /\.(woff2|woff|ttf|svg)$/,
        include: [/fonts/],
        loader: 'file-loader?limit=1024&name=assets/fonts/[folder]/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].css',
    }),
  ],
};

pages.forEach((page) => {
  common.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: `${PATHS.source}/pages/${page}/${page}.pug`,
    }),
  );
});

const devConfig = {
  mode: 'development',
  devServer: {
    index: 'main.html',
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    hot: true,
    port: 8000,
    open: 'chrome',
  }
};

module.exports = function (env) {
  if (env === 'production') {
    return common;
  }
  if (env === 'development') {
    return merge([
      common,
      devConfig,
    ]);
  }
};
