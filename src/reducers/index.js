import { combineReducers } from 'redux';
import { routeReducer as routing } from 'react-router-redux';
import stars from './stars';
import uistate from './uistate';
import user from './user';
import readme from './readme';

export default combineReducers({
  routing,
  stars,
  uistate,
  user,
  readme,
});
