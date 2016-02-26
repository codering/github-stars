/* eslint-disable no-constant-condition */

import { takeEvery, takeLatest } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { isCancelError } from 'redux-saga';
import * as GithubAPI from '../api/github';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractPageFromUrl(url) {
  if (url) return url.split('&page=')[1];
}

function* syncUpdate(getState) {
  yield put({
    type: 'stars/sync/start',
    payload: '',
  });

  const { user, stars } = getState();
  const { username, password, userInfo } = user;
  const url = `https://api.github.com/users/${userInfo.login}/starred?per_page=100&page=1`;
  const { result } = yield call(GithubAPI.fetchStars, url, username, password);
  const ids = stars.data.map(item => item.id);
  const data = result.filter(item => ids.indexOf(item.id) === -1);

  yield put({
    type: 'stars/sync/save',
    payload: data.concat(stars.data),
  });
  yield put({
    type: 'stars/sync/end',
  });
}

function* syncAll(getState) {
  yield put({
    type: 'stars/sync/start',
    payload: 'sync page 1',
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
  });
  yield put({
    type: 'stars/sync/save',
    payload: data,
  });
}

function* sync(getState) {
  while (true) {
    yield take('stars/sync');
    if (getState().stars.syncAllFinished) {
      yield syncUpdate(getState);
    } else {
      yield syncAll(getState);
    }
  }
}

function* update(getState) {
  while (true) {
    yield take('stars/update');
    yield syncUpdate(getState);
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

function* readmeFetch(getState, action) {
    const { payload: repo } = action;

    const { readme, user } = getState();
    const { username, password } = user;

    if (!readme[repo]) {
      yield put({
        type: 'readme/fetch/start',
      });
      const result = yield GithubAPI.getReadme(repo, username, password);
      yield put({
        type: 'readme/save',
        payload: {
          repo,
          content: result.content,
        },
      });
      yield put({
        type: 'readme/fetch/end',
      });
    }
}

function* readmeFetchEvery(getState) {
  yield takeEvery('readme/fetch', readmeFetch, getState);
}

function* starsSelect(getState) {
  while (true) {
    const action = yield take('stars/select');
    const { id, repo } = action.payload;

    yield put({
      type: 'stars/select/save',
      payload: id,
    });
    yield put({
      type: 'readme/fetch',
      payload: repo,
    });
  }
}

function* headerSearchSet(query) {
  try {
    // debounce
    yield call(delay, 300);

    yield put({
      type: 'header/search/save',
      payload: query,
    });
  } catch(e) {
    if(!isCancelError(e)) {
      // handle error
    }
  }
}

function* headerSearch(getState) {
  let previousQuery, task;

  while (true) {
    const { payload: query } = yield take('header/search');
    if (query !== previousQuery) {
      if (task) yield cancel(task);
      task = yield fork(headerSearchSet, query);
      previousQuery = query;
    }
  }
}

export default function* root(getState) {
  yield fork(readmeFetchEvery, getState);
  yield fork(headerSearch, getState);
  yield fork(starsSelect, getState);
  yield fork(sync, getState);
  yield fork(update, getState);
  yield fork(login, getState);
  yield fork(unstar, getState);
}
