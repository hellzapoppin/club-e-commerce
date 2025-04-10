import { combineReducers } from 'redux'
import userReducer from './toolkit/user/user.slice'
import cartReducer from './reducers/cart/cart.reducer'

const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer
})

export default rootReducer
