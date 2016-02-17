import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as GithubAPI from '../api/github';

function* fetchStars() {
  yield put({
    type: 'load stars start',
  });

  const data = yield GithubAPI.loadStars();

  yield put({
    type: 'load stars end',
    payload: data,
  });
}

export default function*() {
  yield* takeEvery('load stars', fetchStars);
}
