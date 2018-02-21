import { push } from 'react-router-redux'
import { getCubeFaces } from '../../3d/rubix/Cube'
import { 
  SEARCH_RETURN_COUNT, 
} from '../../../modules/InstaProxy/InstaProxyActions'
import {
  setThemeFaceImageOpacity,
  setThemeCubeImageOpacity,
} from '../../3d/rubix/CubeActions'

export function searchByUser(e) {
  e.persist();
  if(!this.searchIsUnlocked) {
    return false;
  }
  const { dispatch } = this.props;
  let face = e.target.id.split('-')[1];
  this.searchIsUnlocked = false;

  setTimeout(() => {
    this.searchIsUnlocked = true;
    dispatch(push('/' + face + '/@/' + e.target.value));
    dispatch({
      type: 'USER_FETCH_REQUESTED', 
      value: 
        {
          face: face,
          searchType: 'user', 
          searchValue: e.target.value, 
          returnCount: SEARCH_RETURN_COUNT
        }
    });
  }, 1500)
}

export function searchByUserPaging(e) {
  e.persist();
  if(!this.searchIsUnlocked) {
    return false;
  }
  const { dispatch } = this.props;

  this.searchIsUnlocked = false;

  setTimeout(() => {
    this.searchIsUnlocked = true;
    dispatch(push('/@/' + e.target.value));
    dispatch({
      type: 'USER_FETCH_PAGING_REQUESTED', 
      value: {
        searchType: 'user',
        searchValue: e.target.value, 
        returnCount: SEARCH_RETURN_COUNT,
        pages: getCubeFaces().length,
      }
    });
  }, 1500);
}

export function searchByHashTag(e) {
  e.persist();
  if(!this.searchIsUnlocked) {
    return false;
  }
  const { dispatch } = this.props;
  let face = e.target.id.split('-')[1];
  this.searchIsUnlocked = false;

  setTimeout(() => {
    this.searchIsUnlocked = true;
    dispatch(push('/' + face + '/#/' + e.target.value));
    dispatch({
      type: 'HASHTAG_FETCH_REQUESTED', 
      value: 
        {
          face: face,
          searchType: 'hashTag', 
          searchValue: e.target.value, 
          returnCount: SEARCH_RETURN_COUNT
        }
    });
  }, 1500)
}

export function searchByHashTagPaging(e) {
  e.persist();
  if(!this.searchIsUnlocked) {
    return false;
  }
  const { dispatch } = this.props;

  this.searchIsUnlocked = false;

  setTimeout(() => {
    this.searchIsUnlocked = true;
    dispatch(push('/#/' + e.target.value));
    dispatch({
      type: 'HASHTAG_FETCH_PAGING_REQUESTED', 
      value: {
        searchType: 'hashTag',
        searchValue: e.target.value, 
        returnCount: SEARCH_RETURN_COUNT,
        pages: getCubeFaces().length,
      }
    });
  }, 1500);
}

export function changeAllImageOpacity(newVal) {
  const { dispatch } = this.props;
  let faces = getCubeFaces();
  if(newVal !== '') {
    dispatch(setThemeCubeImageOpacity(faces, newVal));
  }
  return true;
}

export function changeImageOpacity(newVal) {
  const { dispatch } = this.props;
  if(newVal !== '') {
    dispatch(setThemeFaceImageOpacity(this.state.faceId, newVal));
    return true;
  }
}

export function changeSearchType(e) {
  let face = e.split('-')[0];
  let type = e.split('-')[1];
  let newState = JSON.parse(JSON.stringify(this.state.forms));
  let friendlyType = 'color';
  let formType = 'text';

  this.setIgSearchType(type);

  switch (type) {
    case 'bgColor':
      friendlyType = 'color';
      formType = 'text';
      break;
    
    case 'txtColor':
      friendlyType = 'text';
      formType = 'text';
      break;
    
    case 'user':
      friendlyType = '@';
      formType = 'text';
      break;

    case 'hashTag':
      friendlyType = '#';
      formType = 'text';
      break;

    case 'imageOpacity':
      friendlyType = 'opacity';
      formType = 'slider';
      break;

    default:
      friendlyType = 'color';
  }

  // Initially, change search type and set display to none for all
  newState[face].searchType = friendlyType;

  let textBoxes = Object.keys(this.state.forms[face].text);
  let sliders = Object.keys(this.state.forms[face].slider);
  for(var box in textBoxes) {
    newState[face].text[textBoxes[box]].style.display = 'none';
  }
  for(var slider in sliders) {
    newState[face].slider[sliders[slider]].style.display = 'none';
  }

  if(formType === 'slider') {
    newState[face].slider[type].style.display = 'inline';
  } else {
    newState[face].text[type].style.display = 'inline';
  }

  this.setState({forms: newState});
}
