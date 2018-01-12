const path = require('path');
const merge = require('webpack-merge');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var node_dir = __dirname + '/node_modules';
const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const PUBLIC_PATH = path.join(ROOT_PATH, 'public/');

var common = {
  entry: { 
    app: [
      
    ]      
  },      
  output: {
    path: path.resolve('public/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    //new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      // In case you imported plugins individually, you must also require them here:
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
    })
  ]
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/index.js'
      ]
    },
    devServer: {
      contentBase: 'public',
      port: 3000,
      inline: true
    },
    output: {
      path: path.resolve(__dirname, '/public/js'),
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
          proxy: 'http://localhost:3000/'
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
      new ExtractTextPlugin({ filename: '../css/[name].css', allChunks: true})
    ],

    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'file-loader?name=[name].[ext]',
        },
        { 
          test: /\.js$/, 
          loaders: ['react-hot-loader/webpack', 'babel-loader'], 
          include: [
            path.resolve(__dirname, 'src')
          ],
          exclude: path.resolve(__dirname, '/node_modules/')
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
    },

  });
} else if (TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      app: [
        './src'
      ]
    },
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], include: path.join('./src'), exclude: /node_modules/ },
        { test: /\.jsx$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: "css-loader"
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
    },
    plugins: [
      new Webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin({ filename: './../css/[name].css', allChunks: true}),
    ],
  });
} else {
  module.exports = {
    entry: { 
      app: [
        './src'
      ]      
    },      
    output: {
      path: path.resolve('public/js'),
      filename: 'bundle.js',
      publicPath: '/js/'
    },
    plugins: [
      //new Webpack.NoEmitOnErrorsPlugin(),
      new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        // In case you imported plugins individually, you must also require them here:
        Util: 'exports-loader?Util!bootstrap/js/dist/util',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
      }),
      new ExtractTextPlugin({ filename: '../css/[name].css', allChunks: true}),
      new Webpack.optimize.OccurrenceOrderPlugin(),
      new Webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.jsx$/, loaders: ['babel-loader'], exclude: /node_modules/ },
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
  }
}


