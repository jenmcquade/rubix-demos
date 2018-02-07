import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AppWrap from './modules/App/App';
import loader from './assets/loader.gif';
import './assets/icon.png';

export default function App(props) {
  return (
    <Provider store={props.store}>
      <AppWrap>
        <div id="loadingSpinner">
          <img alt="The app is loading..." style={{width: '200px'}} src={loader} />
        </div>
      </AppWrap>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

