import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({

  'header/search/save' (state, action) {
    return {...state, keyword: action.payload};
  },

  'readme/fetch/start' (state) {
    return {...state, readmeLoading: true};
  },

  'readme/fetch/end' (state) {
    return {...state, readmeLoading: false};
  },

  'user/login/start' (state) {
    return {...state, loginLoading: true};
  },

  'user/login/end' (state) {
    return {...state, loginLoading: false};
  },

  'user/login/error' (state, action) {
    return {...state, loginErrorMsg: action.payload};
  },

  'user/login/success' (state, action) {
    return {...state, loginErrorMsg: ''};
  },

  'stars/sync/start' (state, action) {
    return {...state, syncLoading: true, syncStatus: action.payload};
  },

  'stars/sync/end' (state) {
    return {...state, syncLoading: false, syncStatus: ''};
  },

  'stars/sync/progress' (state, action) {
    const { next, last } = action.payload;
    return {...state, syncStatus: `sync page ${next} of ${last}`};
  },

  'stars/unstar/start' (state) {
    return {...state, unstarLoading: true};
  },

  'stars/unstar/end' (state) {
    return {...state, unstarLoading: false};
  },

}, initialState);
