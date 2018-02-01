import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* returnNull(action) {
  yield put({type: 'APP_SAGA_NULL_ACTION'});
  return null;
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* rootSaga() {
  yield takeEvery('APP_ACTION', returnNull);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* rootSaga() {
  yield takeLatest('APP_ACTION', returnNull);
}

export default rootSaga;