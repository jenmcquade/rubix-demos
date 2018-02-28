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
      ...props,
      inProcess: false,
      isMounted: false,
    };
    this.getLatestData = getLatestData.bind(this);
    this.setIgSearchType = setIgSearchType.bind(this);
    this.setIgSearchValue = setIgSearchValue.bind(this);
    this.callIg = callIg.bind(this);
    this.setIgSearchUrl = setIgSearchUrl.bind(this);
    this.setup = setup.bind(this);
  }

  componentDidMount() {
    this.setState({isMounted: true}); // For immediate state checking
    this.setup();

  }

  componentWillReceiveProps(nextProps) {
    let searchProps = getSearchPropsFromUrl(window.location);
    if(searchProps && this.props.router.location.pathname.indexOf('@/') === -1 &&
      this.props.router.location.hash.indexOf('#/') === -1) {
      return false;
    }
    /*
    if(this.props.ig.searchValue !== nextProps.ig.searchValue) {
      this.callIg({
        searchUri: searchProps.searchUri,
        searchType: searchProps.searchType,
        searchValue: searchProps.searchValue,
        returnCount: !searchProps.faceType ? getCubeFaces().length : false
      });
    }
    */
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
  })
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
  let path = ''
  // Build URL
  if(!props.searchUri) {
    path = queryPath + props.searchValue.toLowerCase() + '/media/?count=' + props.returnCount;
  }

  // If we are passed a searchUrl property, 
  //   use the full uri that we can override for paging.
  if(props.searchUri) {
    path = props.searchUri;
  }

  // Send request using fetch
  return fetch(path, initConfig) 
  .then( response => {
    if (response.ok) {
      return response.json().then( thisData => {
        return thisData;
      });
    } else {
      return response.json.json();
    }
  })
  .then((jsonData) => { return jsonData })
  .catch(error => {
    return error
  });
}

/**
 * URL parser for initial IG search values
 * @param {*} location 
 */
function getSearchPropsFromUrl(location) {
  if(typeof location !== 'object') {
    return false;
  }

  let faceType = null;
  let path = '';
  let searchType = SEARCH_DEFAULT_TYPE;
  let searchValue = SEARCH_DEFAULT_VALUE;
  let isHashPath = false;
  let helperPath = '';
  let pathSearchValue = '';

  // Get correct path value from location object
  try {
    if(location.hash !== '') {
      path = location.hash;
      if(location.pathname !== '/') {
        helperPath = location.pathname;
      }
      isHashPath = true;
    } else {
      path = location.pathname;
      helperPath = location.hash;
    }
  } catch(e) {
    return e;
  }

  const pathArray = path.split('/');
  const helperPathArray = helperPath.split('/');
  const searchUrlIndex = pathArray.indexOf('@') ? pathArray.indexOf('@') : pathArray.indexOf('#')

  // Get face to determine
  //  if this is a paged request to all sides
  let faces = getCubeFaces();
  for(let face in faces) {
    if (helperPathArray[1] && faces[face] === helperPathArray[1]) {
      faceType=faces[face];
      firstPropIsFace = true;
      break;
    } 
  }

  // Set the searchType
  switch (pathArray[searchUrlIndex]) {
    case '@':
      searchType = 'user';
      break;
    case '#':
      searchType = 'hashTag';
      break;
    default:
      searchType = 'user';
  }

  try{
    let pathIndex = isHashPath ? searchUrlIndex : searchUrlIndex+1;
    pathSearchValue = pathArray[pathIndex].split('?')[0].toString();
    if(pathSearchValue === '') {
      pathSearchValue = SEARCH_DEFAULT_VALUE;
    }
  } catch (e) {
    pathSearchValue = SEARCH_DEFAULT_VALUE;
  }

  // Set the searchValue
  // Position is dependepent on if /faceId exists and if path is a hash value
  searchValue = pathArray.length > 1 ? pathSearchValue : SEARCH_DEFAULT_VALUE;

  let searchUri = searchType === 'hashTag' ? 
    URL_BASE_HASHTAG + searchValue + '/media/?count=' + SEARCH_RETURN_COUNT:
    URL_BASE_USER + searchValue + '/media/?count=' + SEARCH_RETURN_COUNT;
    
  return {
    faceType: faceType, 
    searchType: searchType, 
    searchValue: searchValue, 
    searchUri: searchUri
  }
}

function setup() {
  if(!this.props.fetchOnLoad) {
    this.props.dispatch(setStatus(false));
    return false;
  }

  this.getLatestData({
    searchUri: URL_BASE_USER + 'server_check_hook',
  }).then( (response) => {
      if (!response || response.code > 1) {
        this.props.dispatch(setIsMounted());
        return false;
      }
      if(response.ok) {
        this.props.dispatch(setStatus(response.ok));
        let searchProps = getSearchPropsFromUrl(window.location);
        let typeToUpper = searchProps.searchType.toUpperCase();
        this.props.dispatch({
          type: !searchProps.faceType ? typeToUpper + '_FETCH_PAGING_REQUESTED' : typeToUpper + '_FETCH_REQUESTED', 
          value: {
            searchUri: searchProps.searchUri,
            searchType: searchProps.searchType,
            searchValue: searchProps.searchValue,
            pages: !searchProps.faceType ? getCubeFaces().length : false,
            face: searchProps.faceType ? searchProps.faceType : null,
            isFirstRequest: true,
          }
        });
      } else {
        this.props.dispatch(setIsMounted());
        return false;
      }
    }
  );
}

InstaProxy.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    router: store.routerReducer,
    ig: store.instaProxy,
  };
}

export default connect(mapStateToProps)(InstaProxy);
