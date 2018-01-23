// Import Actions
import { TOGGLE_MENU } from './MenuActions';

// Initial State
const initialState = {
  menuIsOpen: false,
};

const MenuReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_MENU:
      return {
        menuIsOpen: !state.menuIsOpen,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get isMenuOpen
export const getIsMenuOpen = state => state.menuIsOpen;

// Export Reducer
export default MenuReducer;
