import { createSlice } from '@reduxjs/toolkit'

export interface CalendarState {
	authenticated: boolean
	events: any[] // Replace any with your Event type
}

const initialState: CalendarState = {
	authenticated: false,
	events: [],
}

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		authenticate: (state) => {
			state.authenticated = true
		},
		setEvents: (state, action) => {
			state.events = action.payload
		},
	},
})

export const { authenticate, setEvents } = calendarSlice.actions

export default calendarSlice.reducer
