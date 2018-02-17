import { call, put, takeLatest } from 'redux-saga/effects';
import { callIg } from './InstaProxy';
import { URL_DEFAULT_SEARCH_URL, SEARCH_RETURN_COUNT, PROXY_SERVER } from './InstaProxyActions';
import { getCubeFaces, popOutImages, popInImages } from '../../components/3d/rubix/Cube';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchData(action) {
  try {
    // Don't proceed if we didn't receive a value object in the action
    if(action.value && !action.value === '') {
      return false;
    }

    // Establish a frame for our data container
    let images = {
      nextPage: action.value.searchUri ? action.value.searchUri : URL_DEFAULT_SEARCH_URL, 
      urls: []
    };
    let post = 0;
    
    // Pre-dispatch query settings; overrides defaults
    yield put({type: 'SET_IG_SEARCH_TYPE', value: action.value.searchType});
    yield put({type: 'SET_IG_SEARCH_VALUE', value: action.value.searchValue});
    yield put({type: 'SET_IG_SEARCH_URL', value: action.value.searchUri});

    // Hide images while search is performed
    // TODO: Make this a dispatch to a cube action
    if(action.value.face || action.value.faces) {
      yield hideCubeImages(action.value);
    }

    // Make the fetch call via InstaProxy module's callIg function
    let data = yield call(callIg, action.value);

    // Some additional flight checks before departure back to the store...
    if (data.posts) {
      if(data.posts.length < SEARCH_RETURN_COUNT) {
        yield put({type: 'UPDATE_IG_DATA_LIMITED_RETURN'});
        yield put({type: 'UPDATE_IG_DATA', value: {data: data}});
      } else if (data.posts.length === SEARCH_RETURN_COUNT) {
        yield put({type: 'UPDATE_IG_DATA', value: {data: data}});
      }
    }

    // If we are invited to use paging, set the search url to the next page
    if(data.next) {
      images.nextPage = data.next;
      yield put({type: 'SET_IG_SEARCH_URL', value: data.next});
    }

    // IG Post data image assignment to images array
    for(post in data.posts) {
      images.urls.push(data.posts[post].thumbnail_resources[0].src);
    }

    // At this point, we're OK to fly...
    let msg = action.value.searchType.toUpperCase() + '_FETCH_SUCCEEDED';
    yield put({type: msg, data: data});
    yield call(onFetchSuccess, {action: action, images: images});
    return images.nextPage;
   } catch (e) {
    yield call(onFetchFailure, action);
    return false;
   }
}

/**
 * Post-fetch cleanup actions
 */
function *onFetchSuccess(props) {
  try{
    if(props.action.value.isFirstRequest) {
      yield put({type: 'SET_IS_ONLINE', value: true});
    }
    // If we have images, put them in the store
    //  and reveal the updated face
    if(props.action.value.face) {
      yield put({type: 'SET_THEME_FACE_IMAGES', value: {
        face: props.action.value.face, 
        images: props.images.urls, 
      }});
    } else if(props.action.value.faces) {
      yield put({type: 'SET_THEME_CUBE_IMAGES', value: {
        faces: getCubeFaces(),
        images: props.images,
      }});
    }
  } catch(e) {
    yield put({type: 'ON_FETCH_SUCCESS_ERROR'}); 
  }

  showCubeImages(props.action.value);
}

function *onFetchFailure(action) {
  // We crashed somewhere mid-flight...
  showCubeImages(action.value);
  let msg = action.value.searchType.toUpperCase() + '_FETCH_FAILED';
  yield put({type: msg});
}

/**
 *  Make multiple calls with returned paging urls,
 *    then dispatch each returned set back to the store 
 */
function* fetchPages(action) {
  try {
    let i = 0;
    if(!action.value.pages) {
      return false;
    }
  
    let faces = getCubeFaces(action.value);
    let nextPage = '';
  
    for(i = 0; i < action.value.pages; i++) {
      let newAction = {...action};
      newAction.value.face = faces[i];
      if(nextPage === '') {
        newAction.value.first = true;
        nextPage = yield fetchData(newAction);
      } else {
        newAction.value.first = false;
        newAction.value.searchUri = yield nextPage;
        if(PROXY_SERVER.indexOf('https') !== -1) {
          newAction.value.searchUri = newAction.value.searchUri.replace(/^http:\/\//i, 'https://');
        }

        nextPage = yield getNextImages(newAction);
      }
    }
  } catch (e) {
    showCubeImages(action.value);
  }
}

// Execute fetch on a new action
function* getNextImages(newAction) {
  if(newAction) {
    const data = yield fetchData(newAction);
    return data;
  }
}

// worker Saga: will be fired on change of search type
function* setSearchType(action) {
   try {
      yield put({type: 'SET_IG_SEARCH_TYPE', value: action.value.searchType});
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
  Does not allow concurrent fetches, to allow for paging. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* instaProxySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchData);
  yield takeLatest('HASHTAG_FETCH_REQUESTED', fetchData);
  yield takeLatest('CHANGE_SEARCH_TYPE', setSearchType);
  yield takeLatest('USER_FETCH_PAGING_REQUESTED', fetchPages);
  yield takeLatest('HASHTAG_FETCH_PAGING_REQUESTED', fetchPages);
}

export default instaProxySaga;
