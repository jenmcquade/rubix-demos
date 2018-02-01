
// Export Constants
export const SET_IS_MOUNTED = 'INSTAPROXY_IS_MOUNTED';
export const SETUP = 'INSTAPROXY_SETUP';
export const SET_IS_OFFLINE = 'INSTAPROXY_IS_OFFLINE';
export const SET_IS_ONLINE = 'INSTAPROXY_IS_ONLINE';
export const SET_ERROR = 'INSTAPROXY_ERROR';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';
export const UPDATE_IG_DATA = 'UPDATE_IG_DATA';
export const LOCK_SEARCH = 'LOCK_SEARCH';
export const UNLOCK_SEARCH = 'UNLOCK_SEARCH';
export const SEARCH_RETURN_COUNT = 9;
export const SEARCH_DEFAULT_TYPE = 'user';
export const SEARCH_DEFAULT_USER = 'jonorjen';
export const SEARCH_DEFAULT_HASHTAG = 'reactjs';
export const DURATION_SEARCH_DISPATCH = 800;


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

export function setIgSearchType(type) {
  return {
    type: SET_SEARCH_TYPE,
    value: type,
  }
}

export function setSearchValue({...props}) {
  props.component.getLatestData(
    {
      component: props.component, 
      searchType: props.searchType ? props.searchType : SEARCH_DEFAULT_TYPE, 
      returnCount: props.returnCount ? props.returnCount : SEARCH_RETURN_COUNT,
      searchValue: props.searchValue ? props.searchValue : SEARCH_DEFAULT_USER,
    }
  );
  return {
    type: SET_SEARCH_VALUE,
    value: props.searchType,
  }
}

export function lockSearch() {
  return {
    type: LOCK_SEARCH,
  }
}

export function unlockSearch() {
  return {
    type: UNLOCK_SEARCH,
  }
}