import { combineReducers } from 'redux';
import leads from './leads';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import { reducer as formReducer } from 'redux-form';
import todos from './todos';
import employees from './employees';

export default combineReducers({
  form: formReducer,
  todos,
  employees,
  leads,
  errors,
  messages,
  auth,
});
