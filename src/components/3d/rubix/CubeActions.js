// Export Constants
export const RESTORE_OBJECT = 'RESTORE_OBJECT';
export const FLATTEN_OBJECT = 'FLATTEN_OBJECT';
export const ZOOM_OUT = 'ZOOM_OUT';
export const ZOOM_IN = 'ZOOM_IN';
export const SET_FACE_RGBA = 'SET_FACE_RGBA';
export const SET_FACE_TXT = 'SET_FACE_TXT';
export const RESET_FACE_RGBA = 'RESET_FACE_RGBA';
export const RESET_FACE_TXT = 'RESET_FACE_TXT';

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

export function setThemeRGBA(face) {
  return {
    type: SET_FACE_RGBA,
    value: {face: face.id, bgColor: face.bgColor},
  }
}

export function setThemeTxtColor(face) {
  return {
    type: SET_FACE_TXT,
    value: {face: face.id, txtColor: face.txtColor},
  }
}

export function resetThemeRGBA(faceId) {
  return {
    type: RESET_FACE_RGBA,
    value: {face: faceId},
  }
}

export function resetThemeTxt(faceId) {
  return {
    type: RESET_FACE_TXT,
    value: {face: faceId},
  }
}

