import { createStore } from 'redux'
// import { createStore, applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import rootReducer from './root-reducer'
// @ts-expect-error não tem suporte a TS
import storage from 'redux-persist/lib/storage'
// @ts-expect-error não tem suporte a TS
import persistReducer from 'redux-persist/es/persistReducer'
// @ts-expect-error não tem suporte a TS
import persistStore from 'redux-persist/es/persistStore'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cartReducer']
}

const persistedRootReducer: typeof rootReducer = persistReducer(
  persistConfig,
  rootReducer
)

// const store = createStore(rootReducer, applyMiddleware(logger))
export const store = createStore(persistedRootReducer)
export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
