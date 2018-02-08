import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import configureStore from './store';
/* Import Bootstrap style file, but that variable is useless for us. To import is enough */
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line no-unused-vars
import FontAwesome from 'font-awesome/css/font-awesome.css'; // eslint-disable-line no-unused-vars

const ASSETS_PATH = './assets/';

require(ASSETS_PATH + 'loader.gif');
require(ASSETS_PATH + 'android-icon-36x36.png');
require(ASSETS_PATH + 'android-icon-48x48.png');
require(ASSETS_PATH + 'android-icon-72x72.png');
require(ASSETS_PATH + 'android-icon-96x96.png');
require(ASSETS_PATH + 'android-icon-144x144.png');
require(ASSETS_PATH + 'android-icon-192x192.png');
require(ASSETS_PATH + 'apple-icon.png');
require(ASSETS_PATH + 'apple-icon-60x60.png');
require(ASSETS_PATH + 'apple-icon-72x72.png');
require(ASSETS_PATH + 'apple-icon-76x76.png');
require(ASSETS_PATH + 'apple-icon-114x114.png');
require(ASSETS_PATH + 'apple-icon-120x120.png');
require(ASSETS_PATH + 'apple-icon-144x144.png');
require(ASSETS_PATH + 'apple-icon-152x152.png');
require(ASSETS_PATH + 'apple-icon-180x180.png');
require(ASSETS_PATH + 'favicon.ico');
require(ASSETS_PATH + 'favicon-16x16.png');
require(ASSETS_PATH + 'favicon-32x32.png');
require(ASSETS_PATH + 'favicon-96x96.png');
require(ASSETS_PATH + 'ms-icon-70x70.png');
require(ASSETS_PATH + 'ms-icon-144x144.png');
require(ASSETS_PATH + 'ms-icon-150x150.png');
require(ASSETS_PATH + 'ms-icon-310x310.png');

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    mountApp,
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    alert('test')
    render(App);
  });
}
