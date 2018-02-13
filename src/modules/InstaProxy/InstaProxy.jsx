import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCubeFaces } from '../../components/3d/rubix/Cube';

// Import Actions
import {
  setIsMounted,
  setStatus,
  setSearchType,
  setSearchValue,
  setSearchUrl,
  SEARCH_DEFAULT_TYPE,
  SEARCH_DEFAULT_VALUE,
  SEARCH_RETURN_COUNT,
  URL_BASE_USER,
  URL_BASE_HASHTAG,
} from './InstaProxyActions'

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
    this.setIgSearchType = setIgSearchType.bind(this);
    this.setIgSearchValue = setIgSearchValue.bind(this);
    this.callIg = callIg.bind(this);
    this.setIgSearchUrl = setIgSearchUrl.bind(this);
  }

  componentDidMount() {
    this.setState({isMounted: true}); // For immediate state checking
    this.props.dispatch({
      type: 'USER_FETCH_PAGING_REQUESTED', 
      value: {
        searchType: SEARCH_DEFAULT_TYPE,
        searchValue: SEARCH_DEFAULT_VALUE,
        searchUri: this.props.ig.url,
        pages: getCubeFaces().length,
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

export function setIgSearchUrl(value) {
  const { dispatch } = this.props;
  dispatch(setSearchUrl(value));
  return value;
}

export function setIgSearchType(value) {
  const { dispatch } = this.props;
  dispatch(setSearchType(value));
  return value;
}

export function setIgSearchValue(value) {
  const { dispatch } = this.props;
  dispatch(setSearchValue(value));
  return value;
}

export function callIg({...props}) {
  return getLatestData({
    searchType: props.searchType,
    searchValue: props.searchValue,
    returnCount: props.returnCount ? props.returnCount : SEARCH_RETURN_COUNT,
    searchUri: props.searchUri,
  });
}

/**
 * Take search value and use Redux state
 *  To dispatch query to InstaProxy server
 */
function getLatestData({...props}) {

  // Set our request configurations
  let queryPath = props.searchType === 'user' 
    ? URL_BASE_USER 
    : URL_BASE_HASHTAG;
  
  var initConfig = { 
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };
  // Build URL
  let path = queryPath + props.searchValue.toLowerCase() + '/media/?count=' + props.returnCount;

  // If we are passed a searchUrl property, 
  //   use the full uri that we can override for paging.
  if(props.searchUri && !props.first) {
    path = props.searchUri;
  }

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
    ig: store.instaProxy,
  };
}

export default connect(mapStateToProps)(InstaProxy);
