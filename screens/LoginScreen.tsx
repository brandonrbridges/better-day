// React & React Native
import { TouchableOpacity, View } from 'react-native'

// Components
import BetterText from '@/components/BetterText'
import LoginForm from '@/components/LoginForm'
import SpacedView from '@/components/SpacedView'

export default function LoginScreen({ navigation }) {
	const navigateToForgotPassword = () => navigation.navigate('ForgotPassword')

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

					<BetterText
						style={{
							marginTop: 20,
							textAlign: 'center',
						}}
					>
						{process.env.API_URL}
					</BetterText>
				</View>
				<BetterText
					style={{
						textAlign: 'center',
					}}
				>
					Login to your account
				</BetterText>
				<View
					style={{
						backgroundColor: '#FFF',
						borderRadius: 10,
						padding: 20,
					}}
				>
					<LoginForm />

					<TouchableOpacity onPress={() => navigation.navigate('Register')}>
						<View
							style={{
								backgroundColor: '#000',
								borderRadius: 10,
								marginTop: 10,
								padding: 10,
							}}
						>
							<BetterText
								style={{
									color: '#FFF',
									fontSize: 16,
									textAlign: 'center',
								}}
							>
								Register
							</BetterText>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={navigateToForgotPassword}>
					<BetterText
						style={{
							color: '#59B95C',
							textAlign: 'center',
						}}
					>
						Forgot Password?
					</BetterText>
				</TouchableOpacity>
			</SpacedView>
		</View>
	)
}
