const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const MODULES_PATH = path.resolve(__dirname, 'node_modules');
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const SRC_PATH = path.join(ROOT_PATH, 'src');
const ASSETS_PATH = path.join(SRC_PATH, 'assets', '/');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    'app': [
      path.resolve(MODULES_PATH, 'babel-polyfill'),
      path.resolve(MODULES_PATH, 'webpack-hot-middleware/client?path=/__hmr'),
      path.resolve(SRC_PATH, 'index.js')
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: PUBLIC_PATH,
    publicPath: '/',
    filename: '[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Open 3D Object Viewer',
      filename: 'index.html',
      showErrors: true,
      template: path.resolve(SRC_PATH, 'index.html'),
      buildAt: process.env.BUILD_TIME + ' UTC',
      buildVer: process.env.BUILD_VER,
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT: JSON.stringify(process.env.CLIENT),
        BUILD_TIME: JSON.stringify(process.env.BUILD_TIME),
        BUILD_VER: JSON.stringify(process.env.BUILD_VER),
      }
    }),
    new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true}),
  ],

  module: {
    loaders: [
      { 
        test: /\.js$|\.jsx$/, 
        loaders: [path.resolve(MODULES_PATH, 'babel-loader')], 
        include: [
          SRC_PATH
        ],
        exclude: MODULES_PATH
      },
      {
        test: /\.css$/,
        loaders: [
          path.resolve(MODULES_PATH, 'babel-loader'), 
          path.resolve(MODULES_PATH, 'style-loader'), 
          path.resolve(MODULES_PATH, 'css-loader?importLoaders=1'), 
          path.resolve(MODULES_PATH, 'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'),
        ]
      },
      {
        test: /\.ico$/,
        loader: path.resolve(MODULES_PATH, 'file-loader?name=./[name].[ext]'),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: path.resolve(MODULES_PATH, 'file-loader?name=./static/media/[name].[ext]'),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: path.resolve(MODULES_PATH, 'file-loader?name=./static/media/[name].[ext]'),
      }
    ]
  }
};