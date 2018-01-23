// Import Actions
import { 
  TOGGLE_PERSPECTIVE, 
} from './MenuActions';

// Initial State
const initialState = {
  menuIsOpen: false,
  objectIsFlat: false,
};

const MenuReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_PERSPECTIVE:
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
