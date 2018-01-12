const path = require('path');
const merge = require('webpack-merge');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const MODULES_PATH = __dirname + '/node_modules';
const PUBLIC_PATH = __dirname + 'public';
const BUNDLE_PATH = path.join(PUBLIC_PATH, 'js');
const SRC_PATH = path.join(ROOT_PATH, 'src');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      SRC_PATH
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    inline: true,
    overlay: true,
    hot: true,
    progress: true
  },

  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },

  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options 
      {
        // browse to http://localhost:8080/ during development 
        host: 'localhost',
        port: 8080,
        // proxy the Webpack Dev Server endpoint 
        // (which should be serving on http://localhost:3000/) 
        // through BrowserSync 
        proxy: 'http://localhost:3000/webpack-dev-server/'
      },
      // plugin options 
      {
        // prevent BrowserSync from reloading the page 
        // and let Webpack Dev Server take care of this 
        reload: false,
        inline: true
      }
    ),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: '../css/[name].css', allChunks: true}),
    new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        // In case you imported plugins individually, you must also require them here:
        Util: 'exports-loader?Util!bootstrap/js/dist/util',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
    })
  ],

  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loaders: ['babel-loader'], 
        include: [
          SRC_PATH
        ],
        exclude: MODULES_PATH
      },
      { test: /\.jsx$/, loaders: ['react-hot-loader/webpack', 'babel-loader'], exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      { test: /\.inline.svg$/, loader: 'babel-loader!svg-react-loader' },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=../css/fonts/[name].[ext]'
      }
    ]
  }
};



