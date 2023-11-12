import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const AuthStack = createNativeStackNavigator()

const AuthStackNavigator = () => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name='Login'
				component={LoginScreen}
				options={{
					headerShown: false,
				}}
			/>
			<AuthStack.Screen
				name='ForgotPassword'
				component={ForgotPasswordScreen}
				options={{
					headerShown: false,
				}}
			/>
			<AuthStack.Screen
				name='Register'
				component={RegisterScreen}
				options={{
					headerShown: false,
				}}
			/>
		</AuthStack.Navigator>
	)
}

export default AuthStackNavigator
