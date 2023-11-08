// React
import { createContext, useContext, useReducer } from 'react'

const CalendarContext = createContext(null)

const initialState = {
	authenticated: false,
	events: [],
}

const calendarReducer = (state, action) => {
	switch (action.type) {
		case 'AUTHENTICATE': {
			return {
				...state,
				authenticated: true,
			}
		}
		case 'SET_EVENTS': {
			return {
				...state,
				events: action.payload,
			}
		}
	}
}

export const CalendarProvider = ({ children }) => {
	const [state, dispatch] = useReducer(calendarReducer, initialState)

	return (
		<CalendarContext.Provider value={{ state, dispatch }}>
			{children}
		</CalendarContext.Provider>
	)
}

export const useCalendarContext = () => useContext(CalendarContext)
