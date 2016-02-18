import { handleActions } from 'redux-actions';

const initialState = {
  data: [],
  syncAllFinished: false,
};

export default handleActions({

  'sync stars start' (state, action) {
    return {...state, data: [], syncAllFinished: false};
  },

  'sync stars end' (state, action) {
    return {...state, data: action.payload, syncAllFinished: true};
  },

  'sync stars firstpage' (state, action) {
    return {...state, data: action.payload};
  },

  'select star' (state, action) {
    return {...state, selectedStar: action.payload};
  },

  'unstar end' (state, action) {
    const data = state.data.filter(item => item.id !== state.selectedStar);
    return {...state, data, selectedStar: null};
  },

}, initialState);
