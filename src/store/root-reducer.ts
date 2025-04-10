import { combineReducers } from 'redux'
import userReducer from './toolkit/user/user.slice'
import cartReducer from './toolkit/cart/cart.slice'

const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer
})

export default rootReducer
