import queryString from 'query-string';

// Import Actions
import { 
  RESIZE,
  SET_IS_MOUNTED,
  SET_QS,
  TOGGLE_INFO_PANEL,
} from './AppActions';

let updateWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

let updateHeight = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

let mediaQueries = {
  small: window.matchMedia( '(min-width: 75px) and (max-width: 667px)' ),
  medium: window.matchMedia( '(min-width: 668px) and (max-width: 719px)' ),
  large: window.matchMedia( '(min-width: 720px) and (max-width: 1023px)' ),
  xlarge: window.matchMedia( '(min-width: 1024px)' ),
}

for (var q in mediaQueries) {
  if(mediaQueries[q].matches) {
    var screenSize = q;
  }
}

// Initial State
const initialState = {
  isMounted: false,
  screenSize: screenSize,
  width: updateWidth,
  height: updateHeight,
  qs: {...queryString.parse(window.location.search)},
  infoPanelIsOpen: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_IS_MOUNTED:
      return {
        ...state,
        isMounted: true
      }

    case RESIZE:
      let screenSize = 'xlarge';
      for (var q in mediaQueries) {
        if(mediaQueries[q].matches) {
          screenSize = q;
        }
      }

      let updateWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
      
      let updateHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
      
      return {
        ...state,
        width: updateWidth,
        height: updateHeight,
        screenSize: screenSize,
      }

    case SET_QS: 
      let qs = {...queryString.parse(window.location.search)};
      return {
        ...state,
        qs: qs,
      }

    case TOGGLE_INFO_PANEL:
      return {
        ...state,
        infoPanelIsOpen: action.value !== null ? action.value : !state.infoPanelIsOpen,
      }

    default:
      return state;
  }
};

/* Selectors */

// Getters
export const getWidth = state => state.width;
export const getHeight = state => state.height;
export const getQs = state => state.qs;

// Export Reducer
export default AppReducer;

