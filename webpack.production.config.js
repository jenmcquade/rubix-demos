const path = require('path');
// const merge = require('webpack-merge');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

//const TARGET = process.env.;
const ROOT_PATH = path.resolve(__dirname);
const MODULES_PATH = path.resolve(__dirname, 'node_modules');
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const BUNDLE_PATH = path.join(PUBLIC_PATH, '');
const SRC_PATH = path.join(ROOT_PATH, 'src');
const ASSETS_PATH = path.join(SRC_PATH, 'assets', '/');

module.exports = {
  entry: {
    'app': [
      'babel-polyfill',
      './src/index.js',
      ASSETS_PATH + 'loader.gif',
      ASSETS_PATH + 'android-icon-36x36.png',
      ASSETS_PATH + 'android-icon-48x48.png',
      ASSETS_PATH + 'android-icon-72x72.png',
      ASSETS_PATH + 'android-icon-96x96.png',
      ASSETS_PATH + 'android-icon-144x144.png',
      ASSETS_PATH + 'android-icon-192x192.png',
      ASSETS_PATH + 'apple-icon.png',
      ASSETS_PATH + 'apple-icon-60x60.png',
      ASSETS_PATH + 'apple-icon-72x72.png',
      ASSETS_PATH + 'apple-icon-76x76.png',
      ASSETS_PATH + 'apple-icon-114x114.png',
      ASSETS_PATH + 'apple-icon-120x120.png',
      ASSETS_PATH + 'apple-icon-144x144.png',
      ASSETS_PATH + 'apple-icon-152x152.png',
      ASSETS_PATH + 'apple-icon-180x180.png',
      ASSETS_PATH + 'favicon.ico',
      ASSETS_PATH + 'favicon-16x16.png',
      ASSETS_PATH + 'favicon-32x32.png',
      ASSETS_PATH + 'favicon-96x96.png',
      ASSETS_PATH + 'ms-icon-70x70.png',
      ASSETS_PATH + 'ms-icon-144x144.png',
      ASSETS_PATH + 'ms-icon-150x150.png',
      ASSETS_PATH + 'ms-icon-310x310.png'
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    path: BUNDLE_PATH,
    publicPath: './',
    filename: '[name].js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Open 3D Object Viewer',
      filename: 'index.html',
      showErrors: true,
      template: './src/index.html',
      inject: false,
      minify: {minifyCSS: true, minifyJS: true}
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.optimize.UglifyJsPlugin(), //minify everything
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT: JSON.stringify(process.env.CLIENT),
      }
    }),
    new ExtractTextPlugin({ filename: './static/css/[name].css', allChunks: true}),
    new Webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new Webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new Webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
      minimize: true,
      compress: {
          warnings: false,
      },
      sourceMap: false,
    })
  ],

  module: {
    loaders: [
      { 
        test: /\.js$|\.jsx$/, 
        loaders: ['babel-loader'], 
        include: [
          SRC_PATH
        ],
        exclude: MODULES_PATH
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'
        ]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=./[name].[ext]',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'file-loader?name=./static/media/[name].[ext]',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./static/media/[name].[ext]'
      }
    ]
  }
};