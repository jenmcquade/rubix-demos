import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import AppWrap from './modules/App/App'

export default function App(props) {
  return (
    <Provider store={props.store}>
      <div className="root">
        <AppWrap />
      </div>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

