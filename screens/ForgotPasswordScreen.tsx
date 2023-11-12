// React & React Native
import { Text, View } from 'react-native'

// Components
import BetterText from '@/components/BetterText'
import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import SpacedView from '@/components/SpacedView'

export default function ForgotPasswordScreen({ navigation }) {
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
					Forgotten your Password?
				</BetterText>
				<View
					style={{
						backgroundColor: '#FFF',
						borderRadius: 10,
						padding: 20,
					}}
				>
					<ForgotPasswordForm navigation={navigation} />
				</View>
			</SpacedView>
		</View>
	)
}
