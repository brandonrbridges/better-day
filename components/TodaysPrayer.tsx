// React & React Native
import { useEffect, useState } from 'react'
import { View } from 'react-native'

// Components
import BetterText, { BetterTextTyping } from './BetterText'

const TodaysPrayer = () => {
	const [loading, setLoading] = useState(true)
	const [prayer, setPrayer] = useState('')

	// useEffect(() => {
	// 	console.log('Generating prayer...')

	// 	GET('/ai/prayer').then(({ message }) => {
	// 		console.log('Prayer generated successfully')

	// 		console.log(message)

	// 		setPrayer(message)

	// 		setLoading(false)
	// 	})
	// }, [])

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
				{loading ? (
					<BetterText>Generating prayer...</BetterText>
				) : (
					<BetterText>{prayer}</BetterText>
				)}
			</BetterText>
		</View>
	)
}

export default TodaysPrayer
