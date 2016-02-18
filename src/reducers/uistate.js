import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({

  'change keyword' (state, action) {
    return {...state, keyword: action.payload};
  },

  'unstar start' (state, action) {
    return {...state, unstarLoading: true};
  },

  'unstar end' (state, action) {
    return {...state, unstarLoading: false};
  },

}, initialState);
