// Import Actions
import { 
  SET_IS_MOUNTED,
  SETUP,
  UPDATE_IG_DATA,
  SET_IS_ONLINE,
  SET_IS_OFFLINE,
  SET_ERROR,
  SET_SEARCH_TYPE,
  SET_SEARCH_VALUE,
  NULL_REQUEST,
  SEARCH_RETURN_COUNT,
} from './InstaProxyActions';

// Constants
const PROXY_SERVER = 'http://jonmcquade.from-wa.com:3003';
const PATH_USER = '/';
const PATH_HASHTAG = '/explore/tags/';

// Initial State
const initialState = {
  isMounted: false,
  searchType: 'user',
  searchValue: 'jonorjen',
  urlBaseUser: PROXY_SERVER + PATH_USER,
  urlBaseHashtag: PROXY_SERVER + PATH_HASHTAG, 
  lastPayload: {},
  error: {},
  status: false,
  returnCount: SEARCH_RETURN_COUNT,
  inProcess: false,
};

const InstaProxyReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_IS_MOUNTED:
      newState.isMounted = true;
      return {...state, ...newState};

    case SETUP:
      return {state, ...newState};

    case SET_IS_ONLINE:
      newState.status = true;
      return {...state, ...newState};

    case SET_IS_OFFLINE:
      newState.status = false;
      return {...state, ...newState};

    case SET_ERROR:
      newState.error = state.error;
      return {...state, ...newState};

    case SET_SEARCH_VALUE:
      newState.searchValue = action.value;
      return {...state, ...newState};

    case SET_SEARCH_TYPE:
      newState.searchType = action.value;
      return {...state, ...newState};

    case UPDATE_IG_DATA:
      if(!action.value.data || state.inProcess) {
        return {...state};
      }
      newState.status = true;
      newState.inProcess = false;
      newState.lastPayload = action.value.data;
      return {...state, ...newState};

    case NULL_REQUEST:
      return {...state}

    default:
      return state;
  }
};

/* Selectors */

// Getters


// Export Reducer
export default InstaProxyReducer;

