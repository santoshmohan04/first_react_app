import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import counterreducer from './counters/countersReducer'
import todoreducer from './todo/todoReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  counters: counterreducer,
  todos: todoreducer
})

export default rootReducer