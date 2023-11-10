// Redux
import { configureStore } from '@reduxjs/toolkit'

// Redux Persist
import { persistReducer, persistStore } from 'redux-persist'

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Reducers
import { rootReducer } from './reducers'

const persistConfig = {
	key: 'betterday',
	storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
