import { call, put, takeLatest } from 'redux-saga/effects';
import { callIg } from './InstaProxy';
import { getCubeFaces, popOutImages, popInImages } from '../../components/3d/rubix/Cube';
import { SET_IG_SEARCH_TYPE, SET_IG_SEARCH_VALUE } from './InstaProxyActions';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetch(action) {
  try {
    if(action.value && !action.value === '') {
      return false;
    }

    let searchType = action.value.searchType 
      ? action.value.searchType 
      : SET_IG_SEARCH_TYPE;
    let searchValue = action.value.searchValue 
      ? action.value.searchValue
      : SET_IG_SEARCH_VALUE;
    let images = [];
    let post = 0;
    
    yield put({type: 'SET_IG_SEARCH_TYPE', value: searchType});
    yield put({type: 'SET_IG_SEARCH_VALUE', value: searchValue});

    //yield call(setIgSearchType, action.value.searchType);
    //yield call(setIgSearchValue, action.value.searchValue);

    if(action.value.face || action.value.faces) {
      yield hideCubeImages(action.value);
    }

    const data = yield call(callIg, action.value);

    // Some additional flight checks before departure...

    if(data.posts && data.posts.length > 0) {
      yield put({type: 'UPDATE_IG_DATA', value: {data: data}});
    } else {
      yield showCubeImages(action.value);
      throw({message: 'No post data was returned'});
    }

    for(post in data.posts) {
      images.push(data.posts[post].thumbnail_resources[0].src);
    }

    // At this point, we're OK to fly...

    if(searchType === 'user') {
      yield put({type: 'USER_FETCH_SUCCEEDED', data: data});
    } else {
      yield put({type: 'HASHTAG_FETCH_SUCCEEDED', data: data});
    }

    if(action.value.face) {
        yield put({type: 'SET_THEME_FACE_IMAGES', value: {
          face: action.value.face, 
          images: images, 
        }});
        yield showCubeImages(action.value);
    } else if(action.value.faces) {
      yield put({type: 'SET_THEME_CUBE_IMAGES', value: {
        faces: getCubeFaces(),
        images: images,
      }});
      yield showCubeImages(action.value);
    }

   } catch (e) {
      yield put({type: 'USER_FETCH_FAILED', message: e.message});
   }
}

// worker Saga: will be fired on change of search type
function* setSearchType(action) {
   try {
      yield put({type: 'SET_IG_SEARCH_TYPE', value: action.value.type});
   } catch (e) {
      yield put({type: 'SET_IG_SEARCH_TYPE_FAILED', message: e.message});
   }
}

function hideCubeImages(props) {
  // Hide images until new data is loaded
  if(props.face) {
    popOutImages(props.face);
  } else if(props.faces) {
    let faces = getCubeFaces();
    for(let face in faces) {
      call(popOutImages, face);
    }
  }
}

function showCubeImages(props) {
  // Show images until new data is loaded
  if(props.face) {
    popInImages(props.face);
  } else if(props.faces) {
    let faces = getCubeFaces();
    for(let face in faces) {
      call(popInImages, face);
    }
  }
}

/*
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* instaProxySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetch);
  yield takeLatest('HASHTAG_FETCH_REQUESTED', fetch);
  yield takeLatest('CHANGE_SEARCH_TYPE', setSearchType);
}

export default instaProxySaga;
