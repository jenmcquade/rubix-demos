// Export Constants
export const SET_IS_MOUNTED = 'INSTAPROXY_IS_MOUNTED';
export const SETUP = 'INSTAPROXY_SETUP';
export const SET_IS_OFFLINE = 'INSTAPROXY_IS_OFFLINE';
export const SET_IS_ONLINE = 'INSTAPROXY_IS_ONLINE';
export const SET_ERROR = 'INSTAPROXY_ERROR';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_IG_SEARCH_TYPE = 'SET_IG_SEARCH_TYPE';
export const SET_IG_SEARCH_VALUE = 'SET_IG_SEARCH_VALUE';
export const SET_IG_SEARCH_URL = 'SET_IG_SEARCH_URL';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const UPDATE_IG_DATA = 'UPDATE_IG_DATA';
export const SEARCH_RETURN_COUNT = 9;
export const SEARCH_DEFAULT_TYPE = 'user';
export const SEARCH_DEFAULT_VALUE = 'jonorjen';
export const SEARCH_DEFAULT_HASHTAG = 'reactjs';
export const DURATION_SEARCH_DISPATCH = 1500;
export const NULL_REQUEST = 'NULL_REQUEST';
export const PROXY_SERVER = process.env.NODE_ENV === 'production' ? 'https://jonmcquade.herokuapp.com' : 'http://localhost:3003';
export const PATH_USER = '/';
export const PATH_HASHTAG = '/explore/tags/';
export const URL_BASE_USER = PROXY_SERVER + PATH_USER;
export const URL_BASE_HASHTAG = PROXY_SERVER + PATH_HASHTAG;
export const URL_DEFAULT_SEARCH_URL = PROXY_SERVER + PATH_USER + SEARCH_DEFAULT_VALUE + '/media/?count=' + SEARCH_RETURN_COUNT;

export function setIsMounted() {
  return {
    type: SET_IS_MOUNTED,
  }
}

export function setup() {
  return {
    type: SETUP,
  }
}

export function setStatus(status) {
  if(status) {
    return {
      type: SET_IS_ONLINE,
    }
  } else {
    return {
      type: SET_IS_OFFLINE,
    }
  }
}

export function setSearchUrl(url) {
  return {
    type: SET_IG_SEARCH_URL,
    value: url,
  }
}

export function setSearchType(searchType) {
  return {
    type: SET_IG_SEARCH_TYPE,
  }
}

export function setSearchValue(searchValue) {
  return {
    type: SET_IG_SEARCH_VALUE,
    value: searchValue,
  }
}

export function updateData(data) {
  return {
    type: UPDATE_IG_DATA,
    value: {data: data},
  }
}

export function setServerError(data) {
  return {
    type: SET_ERROR,
    error: data,
  }
}







