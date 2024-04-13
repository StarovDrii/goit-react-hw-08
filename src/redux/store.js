import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import contactsReducer from './contactsSlice'
import filtersReducer from './filtersSlice'

const persistedContactsSlice = persistReducer(
  {
    key: 'contacts',
    storage,
    whitelist: ['items'],
  },
  contactsReducer,
)

const persistedFiltersSlice = persistReducer(
  {
    key: 'filters',
    storage,
    whitelist: ['name'],
  },
  filtersReducer,
)

export const store = configureStore({
  reducer: {
    contacts: persistedContactsSlice,
    filters: persistedFiltersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})

export const persistor = persistStore(store)
