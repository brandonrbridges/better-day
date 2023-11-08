// React & React Native
import { Text } from 'react-native'

// Expo
import { useFonts } from 'expo-font'

// Packages
import TypingText from 'react-native-typing-text'

type BetterTextProps = {
	children: React.ReactNode
	style?: any
}

const BetterText: React.FC<BetterTextProps> = ({ children, style }) => {
	const [loaded] = useFonts({
		Aleo: require('../assets/fonts/Aleo.ttf'),
	})

	if (!loaded) return null

	return <Text style={{ fontFamily: 'Aleo', ...style }}>{children}</Text>
}

const BetterTextTyping: React.FC<BetterTextProps> = ({ children, style }) => {
	const [loaded] = useFonts({
		Aleo: require('../assets/fonts/Aleo.ttf'),
	})

	if (!loaded) return null

	return (
		<Text style={{ fontFamily: 'Aleo', ...style }}>
			<TypingText
				text={children}
				textSize={14}
				color='#000'
				blinkingCursorAnimationDuration={100}
				style={{
					color: '#000',
					fontFamily: 'Aleo !important',
					fontSize: 14,
					textAlign: 'left',
				}}
			/>
		</Text>
	)
}

export default BetterText

export { BetterTextTyping }
