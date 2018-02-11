const express = require('express');
const Path = require('path');

const LOCAL_HOST = 'http://localhost:3002';

const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  next();
})

/**
* Run Browsersync and use middleware for Hot Module Replacement
*/
if (process.env.NODE_ENV === 'development') {
  const browserSync = require('browser-sync').create();
  const webpack = require('webpack');
  const webpackDevMid = require('webpack-dev-middleware');
  const webpackHotMid = require('webpack-hot-middleware');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);
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
          historyApiFallback: true,
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

let buildDir = express.static(Path.resolve(__dirname, 'build'));

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT ? process.env.PORT : 3002, () => console.log('Now serving with WebPack Middleware on port 3002!'))
} else {
  app.use('/', buildDir);
  app.listen(80, () => console.log('Now serving ' + Path.resolve(__dirname, 'build') + ' directory on port 80!'))
}
