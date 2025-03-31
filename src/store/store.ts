import { createStore } from 'redux'
// import { createStore, applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import rootReducer from './root-reducer'

// const store = createStore(rootReducer, applyMiddleware(logger))
const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export default store
