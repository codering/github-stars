import { handleActions } from 'redux-actions';
import * as starActions from '../actions/stars';

const initialState = {
  data: [],
  loading: false,
};

export default handleActions({

  'load stars start' (state, action) {
    return {...state, loading:true};
  },

  'load stars end' (state, action) {
    return {...state, data:action.payload, loading:false};
  },

}, initialState);
