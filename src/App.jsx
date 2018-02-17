import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import AppWrap from './modules/App/App';
import loader from './assets/loader.gif';
import registerServiceWorker from './registerServiceWorker';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

export default function App(props) {
  return (
    <Provider store={props.store}>
      <ConnectedRouter history={history}>
        <AppWrap />
      </ConnectedRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

registerServiceWorker();

