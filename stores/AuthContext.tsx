// React
import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext(null)

const initialState = {
	user: null,
}

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN': {
			return {
				...state,
				user: action.payload,
			}
		}
		case 'LOGOUT': {
			return {
				...state,
				user: null,
			}
		}
		default: {
			return state
		}
	}
}

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState)

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)
