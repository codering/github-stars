import { handleActions } from 'redux-actions';

const initialState = {
  login: false,
};

export default handleActions({

  'user/login/success' (state, action) {
    return {...state, ...action.payload, login: true};
  }

}, initialState);
