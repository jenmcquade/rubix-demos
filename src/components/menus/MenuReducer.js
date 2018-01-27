// Import Actions
import { 
  TOGGLE_MENU_PERSPECTIVE, 
  TOGGLE_MENU_THEME,
  SET_MOBILE_THEME,
  SET_DESKTOP_THEME,
  RESET_MENU_STATE,
} from './MenuActions';

// Initial State
const initialState = {
  isDefaultState: true,
  menus: {
    perspective: {
      triggerColor: 'white',
      baseColor: [255,0,0,1],
      backgroundColor: 'rgba(255,0,0,1)',
      menuIsOpen: false,
      isDefaultState: true,
    },
    theme: {
      triggerColor: 'white',
      baseColor: [0,0,255,1],
      backgroundColor: 'rgba(0,0,255,1)',
      menuIsOpen: false,
      isDefaultState: true,
    },
  },
};

function getThemeRGBA(themeColorArray) {
  let prop = 'rgba(';
  for(var c in themeColorArray) {
    prop += themeColorArray[c] + ','
  }
  let trimmedProp = prop.slice(0, -1); //remove last comma
  trimmedProp += ')';
  return trimmedProp;
}

const MenuReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  var menu;

  switch (action.type) {

    case RESET_MENU_STATE:
      for(menu in newState.menus) {
        newState.menus[menu].isDefaultState = true;
      }
      newState.isDefaultState = true;
      return newState;

    case TOGGLE_MENU_PERSPECTIVE:
      for(menu in newState.menus) {
        if (menu === 'perspective') {
          continue;
        }
        newState.menus[menu].menuIsOpen = false;
      }
      newState.menus['perspective'].menuIsOpen = !newState.menus['perspective'].menuIsOpen;
      newState.menus['perspective'].isDefaultState = false;
      newState.isDefaultState = false;
      return newState;

    case TOGGLE_MENU_THEME:
      for(menu in newState.menus) {
        if (menu === 'theme') {
          continue;
        }
        newState.menus[menu].menuIsOpen = false;
      }
      newState.menus['theme'].menuIsOpen = !newState.menus['theme'].menuIsOpen;
      newState.menus['theme'].isDefaultState = false;
      newState.isDefaultState = false;
      return newState;

    case SET_MOBILE_THEME:
      for(menu in newState.menus) {
        newState.menus[menu].backgroundColor = 'white';
        newState.menus[menu].triggerColor = getThemeRGBA(newState.menus[menu].baseColor);
      }
      return newState;

    case SET_DESKTOP_THEME:
      for(menu in newState.menus) {
        newState.menus[menu].backgroundColor = getThemeRGBA(newState.menus[menu].baseColor);
        newState.menus[menu].triggerColor = 'white';
      }
      return newState;

    default:
      return state;
  }
};

/* Selectors */

// Get isMenuOpen
export const getIsPerspectiveOpen = state => state.perspective.menuIsOpen;
export const getIsThemeOpen = state => state.theme.menuIsOpen;

// Export Reducer
export default MenuReducer;
