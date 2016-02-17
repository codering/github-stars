import { handleActions } from 'redux-actions';
import { loop, Effects } from 'redux-loop';
import * as starActions from '../actions/stars';

const initialState = {
  data: [],
  loading: false,
};

export default handleActions({

  'load stars' (state) {
    return loop(
      {...state, loading:true},
      Effects.batch([
        Effects.promise(starActions.fetchAllStars),
        Effects.constant(starActions.loadStarsEnd()),
      ])
    );
  },

  'fetch all stars' (state, action) {
    return {...state, data:action.payload};
  },

  'load stars end' (state) {
    return {...state, loading:false};
  },

}, initialState);
