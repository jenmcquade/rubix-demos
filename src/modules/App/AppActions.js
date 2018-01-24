// Export Constants
export const RESIZE = 'RESIZE';
export const SET_IS_MOUNTED = 'APP_IS_MOUNTED'

// Export Actions
export function resize() {
  return {
    type: RESIZE,
  };
}

export function setIsMounted() {
  return {
    type: SET_IS_MOUNTED,
  }
}