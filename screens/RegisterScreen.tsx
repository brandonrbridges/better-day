// React & React Native
import { View } from 'react-native'

// Components
import BetterText from '../components/BetterText'
import RegisterForm from '../components/RegisterForm'
import SpacedView from '../components/SpacedView'

export default function RegisterScreen() {
	return (
		<View>
			<SpacedView
				style={{
					paddingTop: 10,
					paddingRight: 20,
					paddingBottom: 10,
					paddingLeft: 20,
				}}
			>
				<View>
					<BetterText
						style={{
							fontSize: 24,
							textAlign: 'center',
						}}
					>
						Better Day
					</BetterText>
					<BetterText
						style={{
							textAlign: 'center',
						}}
					>
						Start everyday, better
					</BetterText>
				</View>
				<BetterText
					style={{
						textAlign: 'center',
					}}
				>
					Register for an account
				</BetterText>
				<View
					style={{
						backgroundColor: '#FFF',
						borderRadius: 10,
						padding: 20,
					}}
				>
					<RegisterForm />
				</View>
			</SpacedView>
		</View>
	)
}
