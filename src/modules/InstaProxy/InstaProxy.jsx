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

// CONSTANTS
const DURATION_RESIZE_DISPATCH = 200;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.app;
    this.shouldUpdateStoreWithNewDims = true;
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    if(!this.shouldUpdateStoreWithNewDims) {
      return false;
    }
    this.shouldUpdateStoreWithNewDims = false;
    setTimeout( () => {
        console.log('dispatching resize...');
        this.props.dispatch(resize());
        this.shouldUpdateStoreWithNewDims = true;
    }, DURATION_RESIZE_DISPATCH);
  }

  componentDidMount() {
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
    menu: store.menu,
  };
}

export default connect(mapStateToProps)(App);