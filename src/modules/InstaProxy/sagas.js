import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import InstaProxy, { callIg } from './InstaProxy'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(callIg, action.value);
      yield put({type: 'USER_FETCH_SUCCEEDED', user: user});
   } catch (e) {
    console.log(e.message);
      yield put({type: 'USER_FETCH_FAILED', message: e.message});
   }
}

// worker Saga: will be fired on HASHTAG_FETCH_REQUESTED actions
function* fetchHashtag(action) {
   try {
      const hashtag = yield call(InstaProxy.call, action.value);
      yield put({type: 'HASHTAG_FETCH_SUCCEEDED', hashtag: hashtag});
   } catch (e) {
      yield put({type: 'HASHTAG_FETCH_FAILED', message: e.message});
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
  yield takeLatest('HASHTAG_FETCH_REQUESTED', fetchUser);
}

export default instaProxySaga;
