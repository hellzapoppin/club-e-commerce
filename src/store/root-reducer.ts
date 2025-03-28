import { combineReducers } from 'redux'
import userReducer from './reducers/use.reducer'

const rootReducer = combineReducers({
  userReducer: userReducer
})

export default rootReducer
