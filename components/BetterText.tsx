// React & React Native
import { Text, TextStyle } from 'react-native'

// Expo
import { useFonts } from 'expo-font'

type BetterTextProps = {
	children: React.ReactNode
	style?: TextStyle
}

const BetterText: React.FC<BetterTextProps> = ({ children, style }) => {
	const [loaded] = useFonts({
		Aleo: require('../assets/fonts/Aleo.ttf'),
	})

	if (!loaded) return null

	return <Text style={{ fontFamily: 'Aleo', ...style }}>{children}</Text>
}

export default BetterText
