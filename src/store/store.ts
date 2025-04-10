// import { createStore, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

// @ts-expect-error não tem suporte a TS
import storage from 'redux-persist/lib/storage'
// @ts-expect-error não tem suporte a TS
import persistReducer from 'redux-persist/es/persistReducer'
// @ts-expect-error não tem suporte a TS
import persistStore from 'redux-persist/es/persistStore'
import rootReducer from './root-reducer'
import { thunk } from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cartReducer']
}

const persistedRootReducer: typeof rootReducer = persistReducer(
  persistConfig,
  rootReducer
)

// export const store = createStore(
//   persistedRootReducer,
//   applyMiddleware(thunk, logger)
// )

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger)
})

// export const store = createStore(persistedRootReducer)
export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
