import { createAction } from 'redux-actions';
import * as GithubAPI from '../api/github';

function wrapAction(type) {
  return data => {
    return {
      type,
      payload: data,
    };
  };
}

export const loadStars = createAction('load stars');
export const loadStarsEnd = createAction('load stars end');

export function fetchAllStars() {
  return GithubAPI.loadStars().then(wrapAction('fetch all stars'));
}

