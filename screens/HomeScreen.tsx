// React & React Native
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

// Stores
import { useCalendarContext } from '../stores/CalendarContext'

// Components
import AudioControls from '../components/AudioControls'
import BetterText from '../components/BetterText'
import Overview from '../components/Overview'
import SpacedView from '../components/SpacedView'
import TodaysPrayer from '../components/TodaysPrayer'
import { useAuthContext } from '../stores/AuthContext'

export default function HomeScreen() {
	const { state: authState } = useAuthContext()
	const { state: calState } = useCalendarContext()

	return (
		<ScrollView
			style={{
				flex: 1,
			}}
		>
			<SpacedView
				style={{
					paddingTop: 10,
					paddingRight: 20,
					paddingBottom: 10,
					paddingLeft: 20,
				}}
			>
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<BetterText
							style={{
								fontSize: 20,
								fontWeight: '700',
							}}
						>
							Welcome back {authState.user.first_name} 👋
						</BetterText>
						<BetterText
							style={{
								color: '#9C9E9C',
							}}
						>
							Days in a row: 329
						</BetterText>
					</View>
					<View>
						<View
							style={{
								backgroundColor: '#DDD',
								borderRadius: 50,
								height: 50,
								width: 50,
							}}
						></View>
					</View>
				</View>
				<Overview />
				<AudioControls />
				<TodaysPrayer />
			</SpacedView>
		</ScrollView>
	)
}
