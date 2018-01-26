import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Helmet from 'react-helmet';
import DevTools from '../../components/DevTools';
import Stage from '../../components/containers/Stage';
import Menu from '../../components/containers/Menu';

// Import Actions
import {
  setIsMounted,
  resize,
} from './AppActions'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.app;
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    this.props.dispatch(resize());
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
    this.setState({isMounted: true}); // For immediate state checking
    this.props.dispatch(setIsMounted()); // For state checking in store
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Open 3D Viewer"
            titleTemplate="%s - Default App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />

          <Menu />
          <Stage />

        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
  };
}

export default connect(mapStateToProps)(App);
