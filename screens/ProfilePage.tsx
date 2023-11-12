// React & React Native
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Stores
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../redux/reducers/auth.reducer'

// Components
import BetterText from '../components/BetterText'
import SpacedView from '../components/SpacedView'
import ProfileForm from '../components/ProfileForm'

export default function ProfileScreen() {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	const handleLogout = () => dispatch(logout())

	return (
		<SpacedView
			style={{
				padding: 20,
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
						{auth.user.first_name} {auth.user.last_name}
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
							Days in a Row: {auth.user.profile.consecutive_days}
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
				<BetterText style={{ marginBottom: 10 }}>Preferences</BetterText>

				<ProfileForm />
			</View>
		</SpacedView>
	)
}
