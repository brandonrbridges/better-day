// React & React Native
import { View } from 'react-native'

// Components
import BetterText, { BetterTextTyping } from './BetterText'

// Packages
import TypingText from 'react-native-typing-text'

const TodaysPrayer = () => {
	const prayer =
		'As I prepare to meet with my boss, I come before You seeking peace and strength. Grant me the serenity to express myself with clarity and the wisdom to listen with an open heart. May Your grace guide our conversation, fostering understanding, mutual respect, and constructive outcomes. Help me to embody the fruits of Your Spirit, showing love, patience, kindness, and self-control. Let my words reflect the respect I have for my position and the work I am entrusted to do. Bless this meeting, O Lord, that it may be productive and honor You in all ways.'

	return (
		<View
			style={{
				backgroundColor: '#FFF',
				borderRadius: 10,
				padding: 20,
			}}
		>
			<BetterText
				style={{
					fontSize: 16,
				}}
			>
				Today's Prayer
			</BetterText>
			<BetterText
				style={{
					color: '#9C9E9C',
					marginTop: 4,
				}}
			>
				Prayer for the day
			</BetterText>
			<BetterText
				style={{
					marginTop: 10,
				}}
			>
				<BetterText>{prayer}</BetterText>
			</BetterText>
		</View>
	)
}

export default TodaysPrayer
