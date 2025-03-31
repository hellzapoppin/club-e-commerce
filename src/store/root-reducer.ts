import { combineReducers } from 'redux'
import userReducer from './reducers/user/use.reducer'

const rootReducer = combineReducers({
  userReducer: userReducer
})

export default rootReducer
