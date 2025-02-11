// исп. redux-persist для сохранения состояния в localstorage
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import todoReducer from "./todo.ts";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, todoReducer)

// мы сохраняем текущие задачи в локальном хранилище
export const store = configureStore({
  reducer: {
    todos: persistedReducer
  },
})

const persistor = persistStore(store)

export {persistor};
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch