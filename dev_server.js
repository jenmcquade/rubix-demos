/** 
 * Express server that serves:
 *  -- BrowserSync with Webpack middleware in development
 * This file is run from the 'npm start' command
 * It is not executed in production; Nginx serves the /build directory instead
*/

// Modules
const express = require('express');
const Path = require('path');

// Express is served over 3002, but is proxied by BrowserSync over 8080
// Nginx proxies to 8080 and has a dynamic port of its own
const LOCAL_HOST = 'http://localhost:3002';
const DEV_PORT = 3002; 

var app = express();

/**
* Run Browsersync and use middleware for Hot Module Replacement
*/
if (process.env.NODE_ENV === 'development') {
  var browserSync = require('browser-sync').create();
  var webpack = require('webpack');
  var webpackDevMid = require('webpack-dev-middleware');
  var webpackHotMid = require('webpack-hot-middleware');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);
  require('react-hot-loader/patch');
  browserSync.init({
    port: 8080,
    proxy: {
      target: LOCAL_HOST,
      middleware: [
        webpackDevMid(compiler, {
          hot: true,
          reload: false,
          publicPath: webpackConfig.output.publicPath,
          contentBase: Path.join(__dirname, 'public'),
          stats: { colors: true, chunks: false },
          historyApiFallback: {
            index: 'index.html'
          },
          quiet: false,
          noInfo: false,
          watchOptions: {
            aggregateTimeout: 300,
            poll: 50,
          },

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMid(compiler, {
          path: '/__hmr',
          overlay: true,
          autoConnect: true,
          log: console.log,
          reload: false,
        })
      ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      './public/**.html',
      './public/static/css/**.css'
    ]
  });
}

if (process.env.NODE_ENV === 'development') {
  app.listen(DEV_PORT, () => console.log('Now serving with WebPack Middleware on port ' + DEV_PORT + '!'))
  app.get('*', function (request, response){
    response.sendFile(Path.resolve(__dirname, 'public', 'index.html'))
  })
} 