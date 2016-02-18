import { takeEvery, takeLatest } from 'redux-saga';
import { fork, take, call, put } from 'redux-saga/effects';
import * as GithubAPI from '../api/github';

function extractPageFromUrl(url) {
  if (url) return url.split('&page=')[1];
}

function* syncAll(getState) {
  yield put({
    type: 'sync stars start',
  });

  const { username, password, userInfo } = getState().user;
  const url = `https://api.github.com/users/${userInfo.login}/starred?per_page=100&page=1`;
  let { links, result } = yield call(GithubAPI.fetchStars, url, username, password);
  let data = result;

  yield put({
    type: 'sync stars firstpage',
    payload: data,
  });

  while(links.next) {
    const object =  yield call(GithubAPI.fetchStars, links.next, username, password);
    links = object.links;
    result = object.result;

    data = data.concat(result);
    yield put({
      type: 'sync stars status',
      payload: {
        next: extractPageFromUrl(links.next),
        last: extractPageFromUrl(links.last),
      },
    });
  }

  yield put({
    type: 'sync stars end',
    payload: data,
  });
}

function* syncUpate() {
}

function* sync(getState) {
  while (true) {
    yield take('sync stars');
    if (getState().stars.syncAllFinished) {
      yield syncUpate(getState);
    } else {
      yield syncAll(getState);
    }
  }
}

function* login(getState) {
  while (true) {
    const action = yield take('user login');
    const { username, password } = action.payload;
    const userInfo = yield GithubAPI.fetchUser(username, password);

    yield put({
      type: 'user login save',
      payload: { username, password, userInfo },
    });
    yield put({
      type: 'sync stars',
    });
  }
}

function* unstar(getState) {
  while (true) {
    const action = yield take('unstar');
    const repo = action.payload;
    console.log(repo);

    yield put({
      type: 'unstar start',
    });

    const { username, password } = getState().user;
    const res = yield GithubAPI.unstar(repo, username, password);
    if (res.status !== 204) {
      throw Error('Error: status should be 204');
    }

    yield put({
      type: 'unstar end',
    });
  }
}

export default function* root(getState) {
  yield fork(sync, getState);
  yield fork(login, getState);
  yield fork(unstar, getState);
}
