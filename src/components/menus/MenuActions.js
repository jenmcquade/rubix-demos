// Export Constants
export const TOGGLE_PERSPECTIVE = 'TOGGLE_PERSPECTIVE';
export const TOGGLE_THEME = 'TOGGLE_THEME';
export const FLATTEN_OBJECT = 'FLATTEN_OBJECT';
export const RESTORE_OBJECT = 'RESTORE_OBJECT';
export const ZOOM_OUT = 'ZOOM_OUT';
export const ZOOM_IN = 'ZOOM_IN';
export const SET_MOBILE_THEME = 'SET_MOBILE_THEME';
export const SET_DESKTOP_THEME = 'SET_DESKTOP_THEME';

// Export Actions
export function toggleMenu(id) {
  return {
    type: 'TOGGLE_' + id.toUpperCase(),
  };
}

export function setMobileTheme() {
  return {
    type: SET_MOBILE_THEME,
  }
}

export function setDesktopTheme() {
  return {
    type: SET_DESKTOP_THEME,
  }
}
