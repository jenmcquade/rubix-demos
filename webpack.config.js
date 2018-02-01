const path = require('path');
// const merge = require('webpack-merge');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

//const TARGET = process.env.;
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
      'webpack-dev-server/client?http://localhost:3000/',
      './src/index.js',
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    contentBase: 'public',
    port: 3000,
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
    publicPath: 'http://0.0.0.0:3000/'
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
        // (which should be serving on http://localhost:3000/) 
        // through BrowserSync 
        proxy: 'http://localhost:3000'
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
        CLIENT: JSON.stringify(process.env.CLIENT),
      }
    }),
    new ExtractTextPlugin({ filename: 'css/[name].css', allChunks: true}),
    //new StyleExtHtmlWebpackPlugin()
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url-loader?name=images/[name].[ext]',
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  }
};