// Providers
import { AuthProvider } from './AuthContext'
import { CalendarProvider } from './CalendarContext'

const Providers = ({ children }) => {
	return (
		<AuthProvider>
			<CalendarProvider>{children}</CalendarProvider>
		</AuthProvider>
	)
}

export default Providers
