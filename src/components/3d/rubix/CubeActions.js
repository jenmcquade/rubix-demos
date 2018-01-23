// Export Constants
export const RESTORE_OBJECT = 'RESTORE_OBJECT';
export const FLATTEN_OBJECT = 'FLATTEN_OBJECT';
export const ZOOM_OUT = 'ZOOM_OUT';
export const ZOOM_IN = 'ZOOM_IN';

export function restoreObject() {
  return {
    type: RESTORE_OBJECT,
  }
}

export function flattenObject() {
  return {
    type: FLATTEN_OBJECT,
  }
}

export function zoomOut() {
  return {
    type: ZOOM_OUT,
  }
}

export function zoomIn() {
  return {
    type: ZOOM_IN,
  }
}

