// Import Actions
import { TOGGLE_MENU } from './AppActions';

// Initial State
const initialState = {
  menu: {
    menuIsOpen: false,
  },
  data: {
    
  },
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        menu: {
          menuIsOpen: !state.menu.menuIsOpen,
        },
        data: {
          
        }
      };

    default:
      return state;
  }
};

/* Selectors */

// Get isMenuOpen
export const getIsMenuOpen = state => state.menu.menuIsOpen;

// Export Reducer
export default AppReducer;
