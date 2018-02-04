// Import Actions
import { 
  SET_IS_MOUNTED,
  SETUP,
  UPDATE_IG_DATA,
  SET_IS_ONLINE,
  SET_IS_OFFLINE,
  SET_ERROR,
  SET_IG_SEARCH_TYPE,
  SET_IG_SEARCH_VALUE,
  NULL_REQUEST,
  SEARCH_RETURN_COUNT,
  PROXY_SERVER, 
  PATH_USER,
  PATH_HASHTAG,
  SET_IG_SEARCH_URL,
  SEARCH_DEFAULT_VALUE,
  URL_DEFAULT_SEARCH_URL
} from './InstaProxyActions';

// Constants


// Initial State
const initialState = {
  isMounted: false,
  searchType: 'user',
  searchValue: 'jonorjen',
  urlBaseUser: PROXY_SERVER + PATH_USER,
  urlBaseHashtag: PROXY_SERVER + PATH_HASHTAG, 
  url: URL_DEFAULT_SEARCH_URL,
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

    case SET_IG_SEARCH_URL:
      newState.url = action.value;
      return {...state, ...newState};

    case SET_IG_SEARCH_VALUE:
      newState.searchValue = action.value;
      return {...state, ...newState};

    case SET_IG_SEARCH_TYPE:
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

