/**
 * CONSUMED BY INDEX.JS
 * The primary goal of this file is as an entry point into the src/modules/App module
 * It also sets up the store history and passes them down
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AppWrap from './modules/App/App';
import loader from './assets/loader.gif';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';

const history = createBrowserHistory();

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router>
        <AppWrap router={history}>
          <div id="loadingSpinner">
            <img alt="The app is loading..." style={{width: '200px'}} src={loader} />
          </div>
        </AppWrap>
      </Router>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};



