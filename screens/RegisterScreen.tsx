// React & React Native
import { TouchableOpacity, View } from 'react-native'

// Components
import BetterText from '@/components/BetterText'
import RegisterForm from '@/components/RegisterForm'
import SpacedView from '@/components/SpacedView'

export default function RegisterScreen({ navigation }) {
	return (
		<View>
			<SpacedView
				style={{
					padding: 20,
					paddingTop: 80,
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

				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<BetterText
						style={{
							fontSize: 16,
							textAlign: 'center',
						}}
					>
						Already have an account? Login
					</BetterText>
				</TouchableOpacity>
			</SpacedView>
		</View>
	)
}
