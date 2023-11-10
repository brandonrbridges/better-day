// React & React Native
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

// Expo
import * as Calendar from 'expo-calendar'
import { StatusBar } from 'expo-status-bar'

// Native Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'

// Redux
import { Provider } from 'react-redux'
import { persistor, store } from './redux/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import { useAppSelector, useAppDispatch } from './redux/hooks'

// Screens
import CalendarScreen from './screens/CalendarScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfilePage'
import RegisterScreen from './screens/RegisterScreen'

// Packages
import dayjs from 'dayjs'
import { setEvents } from './redux/reducers/calendar.reducer'
import BetterText from './components/BetterText'

const Tab = createBottomTabNavigator()

const AppContent = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	useEffect(() => {
		;(async () => {
			const { status } = await Calendar.requestCalendarPermissionsAsync()

			if (status === 'granted') {
				const calendars = await Calendar.getCalendarsAsync(
					Calendar.EntityTypes.EVENT
				)

				const calendarIds = calendars.map((calendar) => calendar.id)
				const startDate = dayjs().subtract(1, 'year').toDate()
				const endDate = dayjs().add(1, 'year').toDate()

				const events = await Calendar.getEventsAsync(
					calendarIds,
					startDate,
					endDate
				)

				dispatch(setEvents(events))
			}
		})()
	}, [])

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={{
						tabBarShowLabel: false,
					}}
				>
					{!auth.user ? (
						<>
							<Tab.Screen
								name='Login'
								component={LoginScreen}
								options={{
									tabBarIcon: ({ focused }) => (
										<Icon
											name='key'
											size={24}
											color={focused ? '#59B95C' : '#CFD3CF'}
										/>
									),
								}}
							/>
							<Tab.Screen
								name='Register'
								component={RegisterScreen}
								options={{
									tabBarIcon: ({ focused }) => (
										<Icon
											name='user-plus'
											size={24}
											color={focused ? '#59B95C' : '#CFD3CF'}
										/>
									),
								}}
							/>
						</>
					) : (
						<>
							<Tab.Screen
								name='Home'
								component={HomeScreen}
								options={{
									tabBarIcon: ({ focused }) => (
										<Icon
											name='home'
											size={24}
											color={focused ? '#59B95C' : '#CFD3CF'}
										/>
									),
								}}
							/>
							<Tab.Screen
								name='Calendar'
								component={CalendarScreen}
								options={{
									tabBarIcon: ({ focused }) => (
										<Icon
											name='calendar'
											size={24}
											color={focused ? '#59B95C' : '#CFD3CF'}
										/>
									),
								}}
							/>
							<Tab.Screen
								name='Profile'
								component={ProfileScreen}
								options={{
									tabBarIcon: ({ focused }) => (
										<Icon
											name='user'
											size={24}
											color={focused ? '#59B95C' : '#CFD3CF'}
										/>
									),
								}}
							/>
						</>
					)}
				</Tab.Navigator>
				<StatusBar style='auto' />
			</NavigationContainer>
		</GestureHandlerRootView>
	)
}

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppContent />
			</PersistGate>
		</Provider>
	)
}
