// Redux
import { createSlice } from '@reduxjs/toolkit'

// Types
import { User } from '@/types/User.types'

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
		updateProfilePicture: (state, action) => {
			state.user!.profile_picture = action.payload
		},
	},
})

export const { setToken, login, logout, updateProfile, updateProfilePicture } =
	authSlice.actions

export default authSlice.reducer
