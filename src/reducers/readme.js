import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({

  'readme/save' (state, action) {
    const { repo, content } = action.payload;
    return {...state, [repo]: content};
  },

}, initialState);
