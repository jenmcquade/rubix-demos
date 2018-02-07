const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const MODULES_PATH = path.resolve(__dirname, 'node_modules');
const PUBLIC_PATH = path.resolve(__dirname, 'public');
const BUNDLE_PATH = path.join(PUBLIC_PATH, '');
const SRC_PATH = path.join(ROOT_PATH, 'src');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3002/',
      './src/index.js',
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    contentBase: 'public',
    port: 3002,
    inline: true,
    hot: true,
    progress: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    useLocalIp: true,
    compress: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    publicPath: 'http://0.0.0.0:3002/'
  },

  output: {
    path: BUNDLE_PATH,
    publicPath: './',
    filename: '[name].js',
  },

  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options 
      {
        // browse to http://localhost:8080/ during development 
        host: '0.0.0.0',
        port: 8080,
        // proxy the Webpack Dev Server endpoint 
        // (which should be serving on http://localhost:3002/) 
        // through BrowserSync 
        proxy: 'http://localhost:3002'
      },
      // plugin options 
      {
        // prevent BrowserSync from reloading the page 
        // and let Webpack Dev Server take care of this 
        reload: false,
        inline: false
      }
    ),
    new HtmlWebpackPlugin({
      title: 'Open 3D Object Viewer',
      filename: 'index.html',
      showErrors: true,
      template: './src/index.html'
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PROD_DOMAIN: JSON.stringify(process.env.PROD_DOMAIN),
        CLIENT: JSON.stringify(process.env.CLIENT),
      }
    }),
    new ExtractTextPlugin({ filename: 'public/css/[name].css', allChunks: true}),
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