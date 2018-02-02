import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import InstaProxy, { callIg, setIgSearchType, setIgSearchValue } from './InstaProxy';
import { getCubeFaces, setImagesToLoading } from '../../components/3d/rubix/Cube';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      call(setIgSearchType, action.value.searchType);
      call(setIgSearchValue, action.value.searchValue);

      if(action.value.face) {
        yield put({type: 'SET_IMAGES_TO_LOADING', value: {face: action.value.face}});
      } else if(action.value.faces) {
        let faces = getCubeFaces();
        for(let face in faces) {
          yield put({type: 'SET_IMAGES_TO_LOADING', value: {face: faces[face]}});
        }
      }
      
      const user = yield call(callIg, action.value);
      let images = [];
      for(let post in user.posts) {
        images.push(user.posts[post].thumbnail_src);
      }
      yield put({type: 'USER_FETCH_SUCCEEDED', user: user});
      yield put({type: 'UPDATE_IG_DATA', value: {data: user}});
      if(action.value.face) {
          yield put({type: 'SET_THEME_FACE_IMAGES', value: {
          face: action.value.face, 
          images: images, 
        }});
      } else if(action.value.faces) {
        yield put({type: 'SET_THEME_CUBE_IMAGES', value: {
          faces: getCubeFaces(),
          images: images,
        }});
      }
   } catch (e) {
      yield put({type: 'USER_FETCH_FAILED', message: e.message});
   }
}

// worker Saga: will be fired on HASHTAG_FETCH_REQUESTED actions
function* fetchHashtag(action) {
   try {
      call(setIgSearchType, action.value.searchType);
      call(setIgSearchValue, action.value.searchValue);

      if(action.value.face) {
        yield put({type: 'SET_IMAGES_TO_LOADING', value: {face: action.value.face}});
      } else if(action.value.faces) {
        let faces = getCubeFaces();
        for(let face in faces) {
          yield put({type: 'SET_IMAGES_TO_LOADING', value: {face: faces[face]}});
        }
      }
      
      const hashtag = yield call(callIg, action.value);
      const images = [];
      for(let post in hashtag.posts) {
        images.push(hashtag.posts[post].thumbnail_src);
      }
      yield put({type: 'HASHTAG_FETCH_SUCCEEDED', hashtag: hashtag});
      yield put({type: 'UPDATE_IG_DATA', value: {data: hashtag}});
      if(action.value.face) {
          yield put({type: 'SET_THEME_FACE_IMAGES', value: {
          face: action.value.face, 
          images: images, 
        }});
      } else if(action.value.faces) {
        yield put({type: 'SET_THEME_CUBE_IMAGES', value: {
          faces: getCubeFaces(),
          images: images,
        }});
      }
   } catch (e) {
      yield put({type: 'HASHTAG_FETCH_FAILED', message: e.message});
   }
}

// worker Saga: will be fired on change of search type
function* setSearchType(action) {
   try {
      const type = yield call(setIgSearchType, action.value.searchType);
      yield put({type: 'SET_IG_SEARCH_TYPE', value: type});
   } catch (e) {
      yield put({type: 'SET_IG_SEARCH_TYPE_FAILED', message: e.message});
   }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* instaProxySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser);
  yield takeLatest('HASHTAG_FETCH_REQUESTED', fetchHashtag);
  yield takeLatest('CHANGE_SEARCH_TYPE', setSearchType);
}

export default instaProxySaga;
