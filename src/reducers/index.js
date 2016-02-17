import { combineReducers } from 'redux-loop';
import { routeReducer as routing } from 'react-router-redux';
import stars from './stars';

export default combineReducers({
  routing,
  stars,
});
