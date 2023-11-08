// React & React Native
import { View } from 'react-native'

// Components
import BetterText from '../components/BetterText'
import SpacedView from '../components/SpacedView'

export default function ProfileScreen() {
	return (
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
					backgroundColor: '#FFF',
					borderRadius: 10,
					flexDirection: 'row',
					padding: 10,
				}}
			>
				<View
					style={{
						backgroundColor: '#F1F1F1',
						borderRadius: 10,
						height: 80,
						marginRight: 10,
						width: 80,
					}}
				></View>
				<View>
					<BetterText
						style={{
							fontSize: 16,
						}}
					>
						[FirstName] [LastName]
					</BetterText>
					<View
						style={{
							flexDirection: 'row',
							marginTop: 4,
						}}
					>
						<BetterText
							style={{
								color: '#9C9E9C',
								marginRight: 10,
							}}
						>
							Level: 10
						</BetterText>
						<BetterText
							style={{
								color: '#9C9E9C',
							}}
						>
							Days in a Row: 320
						</BetterText>
					</View>
				</View>
			</View>

			<View
				style={{
					backgroundColor: '#FFF',
					borderRadius: 10,
					padding: 10,
				}}
			>
				<BetterText>Preferences</BetterText>
			</View>
		</SpacedView>
	)
}
