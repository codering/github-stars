import { createAction } from 'redux-actions';

export const syncStars = createAction('sync stars');
export const selectStar = createAction('select star');
export const unstar = createAction('unstar');
