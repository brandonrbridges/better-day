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

// Stores
import Providers from './stores/Provider'
import { useAuthContext } from './stores/AuthContext'
import { useCalendarContext } from './stores/CalendarContext'

// Screens
import CalendarScreen from './screens/CalendarScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfilePage'
import RegisterScreen from './screens/RegisterScreen'

// Packages
import dayjs from 'dayjs'

const Tab = createBottomTabNavigator()

const AppContent = () => {
	const { state: authState } = useAuthContext()
	const { dispatch: calendarDispatch } = useCalendarContext()

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

				console.log('[Better Day] Calendars loaded successfully')

				calendarDispatch({
					type: 'SET_EVENTS',
					payload: events,
				})
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
					{!authState.access_token ? (
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
		<Providers>
			<AppContent />
		</Providers>
	)
}
