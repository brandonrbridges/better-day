// React & React Native
import { View } from 'react-native'

// Components
import BetterText from '@/components/BetterText'
import LoginForm from '@/components/LoginForm'
import SpacedView from '@/components/SpacedView'

export default function LoginScreen() {
	return (
		<View>
			<SpacedView
				style={{
					padding: 20,
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
				</View>
			</SpacedView>
		</View>
	)
}
