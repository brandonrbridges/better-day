import { createSlice } from '@reduxjs/toolkit'

export interface MessageState {
	content: string | null
	audio: null
}

const initialState: MessageState = {
	content: null,
	audio: null,
}

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessage: (state, action) => {
			state.content = action.payload
		},
		setAudio: (state, action) => {
			state.audio = action.payload
		},
	},
})

export const { setMessage, setAudio } = messageSlice.actions

export default messageSlice.reducer
