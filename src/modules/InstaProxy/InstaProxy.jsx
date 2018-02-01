import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Import Actions
import {
  setIsMounted,
  setup,
  updateData,
  setStatus,
  setSearchValue,
  setServerError,
  lockSearch,
  unlockSearch,
  DURATION_SEARCH_DISPATCH,
} from './InstaProxyActions'

// CONSTANTS


export class InstaProxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      ...props.ig,
    };
    this.getLatestData = getLatestData.bind(this);
    this.setIgStatus = setStatus.bind(this);
    this.setIgSearchValue = setIgSearchValue.bind(this);
    this.lockIgSearch = lockIgSearch.bind(this);
    this.unlockIgSearch = unlockIgSearch.bind(this);
  }

  componentDidMount() {
    this.setState({isMounted: true}); // For immediate state checking
    this.props.dispatch(setIsMounted()); // For state checking in store
  }

  render() {
    return (
      <div id="instaProxy"></div>
    );
  }
}

export function getLatestData({...props}) {

  if(props.ignoreRequest) {
    return false;
  }

  let queryPath = props.searchType === 'user' 
    ? props.component.state.ig.urlBaseUser 
    : props.component.state.ig.urlBaseHashtag;
  let path = '';
  var initConfig = { 
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };

  ////THIS IS WHERE YOU ARE
  path = queryPath + props.searchValue + '/media/?count=' + props.returnCount;
  fetch(path, initConfig)
  .then( response => {
    if (response.ok) {
      this.unlockIgSearch();
      return response.json().then( thisData => {
        this.props.dispatch(setStatus(true));
        return this.props.dispatch(updateData(thisData));
      })
    }
  }).catch(error => {
    this.unlockIgSearch();
    if(this.props) {
      this.props.dispatch(setServerError(error));
      return this.props.dispatch(setStatus(false));
    }
  });
}

export function setIgSearchValue(c, value) {
  let ignoreRequest = c.state.ig.inProcess;

  setTimeout( () => {
    if(!ignoreRequest) {
      c.lockIgSearch(); // In Process
    }
    return c.props.dispatch(setSearchValue({component: c, searchValue: value, ignoreRequest: ignoreRequest}));
  }, DURATION_SEARCH_DISPATCH);
}

export function lockIgSearch() {
  if(!this.state.inProcess) {
    this.props.dispatch(lockSearch());
  }
}

export function unlockIgSearch() {
  this.props.dispatch(unlockSearch());
}

InstaProxy.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    app: store.app,
    ig: store.instaProxy,
  };
}

export default connect(mapStateToProps)(InstaProxy);
