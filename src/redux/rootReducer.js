import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import counterreducer from './counters/countersReducer';
import todoreducer from './todo/todoReducer';
import weatherreducer from './vatavaran/vatavaranReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  counters: counterreducer,
  todos: todoreducer,
  vatavaran: weatherreducer
})

export default rootReducer