// Import Actions
import { 
  RESIZE,
  SET_IS_MOUNTED,
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
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_IS_MOUNTED:
      return {
        isMounted: true,
        width: state.width,
        height: state.height,
        screenSize: state.screenSize,
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
        isMounted: state.isMounted,
        width: updateWidth,
        height: updateHeight,
        screenSize: screenSize,
      };

    default:
      return state;
  }
};

/* Selectors */

// Getters
export const getWidth = state => state.width;
export const getHeight = state => state.height;

// Export Reducer
export default AppReducer;

