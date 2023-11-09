// Redux
import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import authReducer from './auth.reducer'
import calendarReducer from './calendar.reducer'

export const rootReducer = combineReducers({
	auth: authReducer,
	calendar: calendarReducer,
})
