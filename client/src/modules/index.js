import { combineReducers } from 'redux';
import list from './list';
import shorten from './shorten';
import login from './login';

export default combineReducers({
  list,
  shorten,
  login
});
