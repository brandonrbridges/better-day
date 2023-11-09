// React & React Native
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Stores
import { useAuthContext } from '../stores/AuthContext'

// Components
import BetterText from '../components/BetterText'
import SpacedView from '../components/SpacedView'

export default function ProfileScreen() {
	const { state: authState, dispatch: authDispatch } = useAuthContext()

	const handleLogout = () => authDispatch({ type: 'LOGOUT' })

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
						{authState.user.first_name} {authState.user.last_name}
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

			<TouchableOpacity onPress={handleLogout}>
				<View
					style={{
						backgroundColor: '#FFF',
						borderRadius: 10,
						marginTop: 10,
						padding: 10,
					}}
				>
					<BetterText>Logout</BetterText>
				</View>
			</TouchableOpacity>

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
