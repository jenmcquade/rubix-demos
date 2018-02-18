/** 
 * Express server that serves either:
 *  -- BrowserSync and Webpack middleware in development
 *  OR
 *  -- /build directory of static files in production
*/

var compression = require('compression')
var express = require('express');
var Path = require('path');
var fallback = require('express-history-api-fallback');
var root = process.env.NODE_ENV === 'production' ? '/build' : '/public';

var LOCAL_HOST = 'http://localhost:3002';

var app = express();
app.use(compression({threshold: 0}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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
    port: process.env.PORT ? process.env.PORT : 8080,
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

var buildDir = Path.resolve(__dirname, 'build');
var serveBuildDir = express.static(buildDir);
var prod_port = process.env.PORT ? process.env.PORT : 80;
var dev_port = 3002; // Express is served over 3002, but is proxied by BrowserSync

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
  app.listen(dev_port, () => console.log('Now serving with WebPack Middleware on port ' + dev_port + '!'))
} else {
  app.use('/', serveBuildDir);
  app.use(fallback('index.html', { buildDir }));
  app.listen(prod_port, () => console.log('Now serving on port ' + prod_port + ' using the ' + Path.resolve(__dirname, 'build') + ' directory!'))
}
