import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({

  'change keyword' (state, action) {
    return {...state, keyword: action.payload};
  }

}, initialState);
