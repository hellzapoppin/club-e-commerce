import { combineReducers } from 'redux'
import userReducer from './toolkit/user/user.slice'
import cartReducer from './toolkit/cart/cart.slice'
import categoryReducer from './toolkit/category/category.slice'

const rootReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
  categoryReducer: categoryReducer
})

export default rootReducer
