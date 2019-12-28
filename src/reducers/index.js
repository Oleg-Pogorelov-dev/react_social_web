import { combineReducers } from 'redux'
import { postReducer } from './posts'
import { userReducer } from './users'
import { reducer } from '../sagas/saga'

export const rootReducer = combineReducers({
  post: reducer,
  user: userReducer,
})
