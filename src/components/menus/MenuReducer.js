// Import Actions
import { 
  TOGGLE_PERSPECTIVE, 
} from './MenuActions';

// Initial State
const initialState = {
  menuIsOpen: false,
  isDefaultState: true,
};

const MenuReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_PERSPECTIVE:
      return {
        menuIsOpen: !state.menuIsOpen,
        isDefaultState: false,
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
