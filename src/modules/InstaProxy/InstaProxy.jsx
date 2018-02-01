import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Actions
import {
  setIsMounted,
  setStatus,
  SET_SEARCH_TYPE,
  SET_SEARCH_VALUE,
  SEARCH_DEFAULT_TYPE,
  SEARCH_DEFAULT_VALUE,
  SEARCH_RETURN_COUNT,
  URL_BASE_USER,
  URL_BASE_HASHTAG,
} from './InstaProxyActions'

// CONSTANTS
export class InstaProxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProcess: false,
      isMounted: false,
      ...props.ig,
    };
    this.getLatestData = getLatestData.bind(this);
    this.setIgStatus = setStatus.bind(this);
    this.setIgSearchValue = setIgSearchValue.bind(this);
    this.callIg = callIg.bind(this);
  }

  componentDidMount() {
    this.setState({isMounted: true}); // For immediate state checking
    this.props.dispatch({
      type: 'USER_FETCH_REQUESTED', 
      value: {
        searchType: SEARCH_DEFAULT_TYPE,
        searchValue: SEARCH_DEFAULT_VALUE, 
      }
    });
    this.props.dispatch(setIsMounted()); // For state checking in store
  }

  render() {
    return (
      <div id="instaProxy"></div>
    );
  }
}

export function setIgSearchType(value) {
  this.dispatch({
    type: SET_SEARCH_TYPE,
    value: value,
  });
}

export function setIgSearchValue(value) {
  this.dispatch({
    type: SET_SEARCH_VALUE,
    value: value,
  });
}

export function callIg({...props}) {
  return getLatestData({
    searchType: props.searchType,
    searchValue: props.searchValue,
  });
}

/**
 * Take search value and use Redux state
 *  To dispatch query to InstaProxy server
 */
function getLatestData({...props}) {
  let returnCount = props.returnCount ? props.returnCount : SEARCH_RETURN_COUNT;
  let searchType = props.searchType ? props.searchType : SEARCH_DEFAULT_TYPE;
  let searchValue = props.searchValue ? props.searchValue : SEARCH_DEFAULT_VALUE;
  // Set our request configurations
  let queryPath = searchType === 'user' 
    ? URL_BASE_USER 
    : URL_BASE_HASHTAG;
  var initConfig = { 
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };

  // Build URL
  let path = queryPath + searchValue + '/media/?count=' + returnCount;

  // Send request using fetch
  return fetch(path, initConfig) 
  .then( response => {
    if (response.ok) {
      return response.json().then( thisData => {
        return thisData;
      });
    }
  })
  .then((jsonData) => { return jsonData })
  .catch(error => {
    return error
  });
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
