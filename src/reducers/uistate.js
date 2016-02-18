import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({

  'change keyword' (state, action) {
    return {...state, keyword: action.payload};
  },

  'sync stars start' (state, action) {
    return {...state, syncLoading: true, syncStatus: 'sync page 1'};
  },

  'sync stars end' (state, action) {
    return {...state, syncLoading: false, syncStatus: ''};
  },

  'sync stars status' (state, action) {
    const { next, last } = action.payload;
    return {...state, syncStatus: `sync page ${next} of ${last}`};
  },

  'unstar start' (state, action) {
    return {...state, unstarLoading: true};
  },

  'unstar end' (state, action) {
    return {...state, unstarLoading: false};
  },

}, initialState);
