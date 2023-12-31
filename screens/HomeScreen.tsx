// React & React Native
import React from 'react'
import { Image, View } from 'react-native'

// React Native Packages
import { ScrollView } from 'react-native-gesture-handler'

// Redux
import { useAppSelector } from '@/redux/hooks'

// Components
import AudioControls from '@/components/AudioControls'
import BetterText from '@/components/BetterText'
import Overview from '@/components/Overview'
import SpacedView from '@/components/SpacedView'
import TodaysPrayer from '@/components/TodaysPrayer'

export default function HomeScreen() {
	const auth = useAppSelector(({ auth }) => auth)

	return (
		<ScrollView
			style={{
				flex: 1,
			}}
		>
			<SpacedView
				style={{
					padding: 20,
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
							Welcome back {auth.user.first_name} 👋
						</BetterText>
						<BetterText
							style={{
								color: '#9C9E9C',
							}}
						>
							Days in a row: {auth.user.profile.consecutive_days}
						</BetterText>
					</View>
					<View>
						<View
							style={{
								alignItems: 'center',
								backgroundColor: '#DDD',
								borderRadius: 50,
								height: 50,
								justifyContent: 'center',
								overflow: 'hidden',
								position: 'relative',
								width: 50,
							}}
						>
							{auth.user.profile_picture && (
								<Image
									source={{ uri: auth.user.profile_picture }}
									style={{
										position: 'absolute',
										height: '100%',
										objectFit: 'cover',
										width: '100%',
									}}
								/>
							)}
						</View>
					</View>
				</View>
				<Overview />
				<AudioControls />
				<TodaysPrayer />
			</SpacedView>
		</ScrollView>
	)
}
