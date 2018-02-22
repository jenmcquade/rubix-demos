/** 
 * Express server that serves either:
 *  -- BrowserSync and Webpack middleware in development
 *  OR
 *  -- /build directory of static files in production
*/

var compression = require('compression')
var express = require('express');
var Path = require('path');
var fs = require('fs');
var https = require('https');
var http = require('http');

var LOCAL_HOST = 'http://localhost:3002';

var app = express();
app.use(compression({threshold: 0}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var forceSsl = function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}

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

var buildDir = __dirname+'build';
var prod_port = process.env.PORT ? process.env.PORT : 80;
var prod_ssl_port = 443;
var dev_port = 3002; // Express is served over 3002, but is proxied by BrowserSync
var isLocalProd = process.env.LOCAL_PROD ? process.env.LOCAL_PROD : 'false'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
  app.listen(dev_port, () => console.log('Now serving with WebPack Middleware on port ' + dev_port + '!'))
  app.get('*', function (request, response){
    response.sendFile(Path.resolve(__dirname, 'build', 'index.html'))
  })
} else {
  app.use(express.static(__dirname + 'build'))
  app.get('*', function (request, response){
    response.sendFile(Path.resolve(__dirname, 'build', 'index.html'))
  })
  if(isLocalProd === 'false') {
    app.use(forceSsl);
    app.listen(prod_port, () => console.log('Now serving on port ' + prod_port + ' using the ' + buildDir + ' directory!'));
  } else {
    var options = {
      key: fs.readFileSync('/localhost.key'),
      cert: fs.readFileSync('/localhost.crt'),
      ciphers: 'ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES256-SHA384',
      honorCipherOrder: true,
      secureProtocol: 'TLSv1_2_method'
    };
    http.createServer(app).listen(prod_port, function(){
      console.log('Now serving HTTP on port ' + prod_port + ' using the ' + buildDir + ' directory!');
    });
    https.createServer(options, app).listen(prod_ssl_port, function(){
      console.log('Now serving with SSL on port ' + prod_ssl_port + ' using the ' + buildDir + ' directory!');
    });
  }
}

