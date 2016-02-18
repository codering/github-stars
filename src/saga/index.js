import { takeEvery, takeLatest } from 'redux-saga';
import { fork, take, call, put } from 'redux-saga/effects';
import * as GithubAPI from '../api/github';

function extractPageFromUrl(url) {
  if (url) return url.split('&page=')[1];
}

function* syncAll(getState) {
  yield put({
    type: 'stars/sync/start',
  });

  const { username, password, userInfo } = getState().user;
  const url = `https://api.github.com/users/${userInfo.login}/starred?per_page=100&page=1`;
  let { links, result } = yield call(GithubAPI.fetchStars, url, username, password);
  let data = result;

  yield put({
    type: 'stars/sync/firstpage',
    payload: data,
  });

  yield put({
    type: 'stars/sync/progress',
    payload: {
      next: extractPageFromUrl(links.next),
      last: extractPageFromUrl(links.last),
    },
  });

  while(links.next) {
    const object =  yield call(GithubAPI.fetchStars, links.next, username, password);
    links = object.links;
    result = object.result;

    data = data.concat(result);
    yield put({
      type: 'stars/sync/progress',
      payload: {
        next: extractPageFromUrl(links.next),
        last: extractPageFromUrl(links.last),
      },
    });
  }

  yield put({
    type: 'stars/sync/end',
    payload: data,
  });
}

function* syncUpate() {
}

function* sync(getState) {
  while (true) {
    yield take('stars/sync');
    if (getState().stars.syncAllFinished) {
      yield syncUpate(getState);
    } else {
      yield syncAll(getState);
    }
  }
}

function* login(getState) {
  while (true) {
    const action = yield take('user/login');

    yield put({
      type: 'user/login/start',
    });

    const { username, password } = action.payload;
    const userInfo = yield GithubAPI.fetchUser(username, password);

    if (userInfo.message) {
      yield put({
        type: 'user/login/error',
        payload: userInfo.message,
      });
    } else {
      yield put({
        type: 'user/login/success',
        payload: {username, password, userInfo},
      });
      yield put({
        type: 'stars/sync',
      });
    }

    yield put({
      type: 'user/login/end',
    });
  }
}

function* unstar(getState) {
  while (true) {
    const action = yield take('stars/unstar');
    const repo = action.payload;
    console.log(repo);

    yield put({
      type: 'stars/unstar/start',
    });

    const { username, password } = getState().user;
    const res = yield GithubAPI.unstar(repo, username, password);
    if (res.status !== 204) {
      throw Error('Error: status should be 204');
    }

    yield put({
      type: 'stars/unstar/end',
    });
  }
}

export default function* root(getState) {
  yield fork(sync, getState);
  yield fork(login, getState);
  yield fork(unstar, getState);
}
