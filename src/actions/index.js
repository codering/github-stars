import { createAction } from 'redux-actions';

export const userLogin = createAction('user/login');

export const starsSync = createAction('stars/sync');
export const starsUpdate = createAction('stars/update');
export const starsSelect = createAction('stars/select');
export const starsUnstar = createAction('stars/unstar');
export const starsGetReadme = createAction('stars/getReadme');

export const headerSearch = createAction('header/search');

export const readmeFetch = createAction('readme/fetch');
