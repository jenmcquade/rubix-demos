import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Additional Modules
import InstaProxy from '../InstaProxy/InstaProxy';

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
    this.state = {
      ...props,
      igProxyIsOnline: false,
    }
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
        this.props.dispatch(resize());
        this.shouldUpdateStoreWithNewDims = true;
    }, DURATION_RESIZE_DISPATCH);
  }

  componentWillMount() {
    let loadingImg = document.querySelector('#loadingSpinner');
    let rootNode = document.querySelector('#root');
    rootNode.style.overflow = 'hidden';
    rootNode.style.position = 'fixed'; 
    if(loadingImg) {
      loadingImg.style.display = 'none';
    }
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
        <div style={{display: 'flex'}}>
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
          <a href="https://github.com/jonmcquade/rubix-demos">
            <img style={{position: 'absolute', top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" />
          </a>
          <Stage />
          <InstaProxy fetchOnLoad={true} />
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
    ig: store.instaProxy,
  };
}

export default connect(mapStateToProps)(App);

