import { createSlice } from '@reduxjs/toolkit'

export interface MessageState {
	content: string | null
	audio: null
	date: Date | null
}

const initialState: MessageState = {
	content: null,
	audio: null,
	date: null,
}

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessage: (state, action) => {
			state.content = action.payload.content
			state.date = action.payload.date
		},
		setAudio: (state, action) => {
			state.audio = action.payload
		},
	},
})

export const { setMessage, setAudio } = messageSlice.actions

export default messageSlice.reducer
