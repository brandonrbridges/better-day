import { createSlice } from '@reduxjs/toolkit'

export interface User {
	id: string
	email: string
	first_name: string
	last_name: string
	profile: Profile
}

export interface Profile {
	age?: number
	religion?: string
}

export interface AuthState {
	user: User | null
	access_token: string | null
}

const initialState: AuthState = {
	user: null,
	access_token: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.access_token = action.payload
		},
		login: (state, action) => {
			state.user = action.payload
		},
		logout: (state) => {
			state.user = null
			state.access_token = null
		},
		updateProfile: (state, action) => {
			state.user!.profile = action.payload
		},
	},
})

export const { setToken, login, logout, updateProfile } = authSlice.actions

export default authSlice.reducer
