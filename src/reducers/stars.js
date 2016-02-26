import { handleActions } from 'redux-actions';

const initialState = {
  data: [],
  syncAllFinished: false,
};

export default handleActions({

  'stars/sync/empty' (state, action) {
    return {...state, data: [], syncAllFinished: false};
  },

  'stars/sync/save' (state, action) {
    return {...state, data: action.payload, syncAllFinished: true};
  },

  'stars/sync/firstpage' (state, action) {
    return {...state, data: action.payload};
  },

  'stars/select/save' (state, action) {
    return {...state, selectedStarId: action.payload};
  },

  'stars/unstar/end' (state, action) {
    const data = state.data.filter(item => item.id !== state.selectedStarId);
    return {...state, data, selectedStarId: null};
  },

}, initialState);
