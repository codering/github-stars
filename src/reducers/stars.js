import { handleActions } from 'redux-actions';

const initialState = {
  data: [],
  syncAllFinished: false,
};

export default handleActions({

  'stars/sync/start' (state, action) {
    return {...state, data: [], syncAllFinished: false};
  },

  'stars/sync/end' (state, action) {
    return {...state, data: action.payload, syncAllFinished: true};
  },

  'stars/sync/firstpage' (state, action) {
    return {...state, data: action.payload};
  },

  'stars/select' (state, action) {
    return {...state, selectedStar: action.payload};
  },

  'stars/unstar/end' (state, action) {
    const data = state.data.filter(item => item.id !== state.selectedStar);
    return {...state, data, selectedStar: null};
  },

}, initialState);
