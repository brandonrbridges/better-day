// React & React Native
import { useEffect, useState } from 'react'
import { View } from 'react-native'

// Redux
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setAudio, setMessage } from '../stores/reducers/message.reducer'

// Components
import BetterText from './BetterText'

// Fetch
import { POST } from '../utils/fetch'

// Packages
import dayjs from 'dayjs'

const TodaysPrayer = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const calendar = useAppSelector(({ calendar }) => calendar)
	const message = useAppSelector(({ message }) => message)

	const dispatch = useAppDispatch()

	const [loading, setLoading] = useState(false)

	const getPrayer = async () => {
		const events = calendar.events.filter((event) => {
			const today = dayjs()
			const eventDate = dayjs(event.startDate)

			if (today.isSame(eventDate, 'day')) {
				return true
			}
		})

		try {
			setLoading(true)

			const response = await POST('/ai/prayer', {
				id: auth.user.id,
				events: events,
			})

			dispatch(setMessage(response.content))
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (message.content) {
			return
		}

		getPrayer()
	}, [])

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
				Today's{' '}
				{auth.user.profile.religion === 'Atheist' ? 'Thought' : 'Prayer'}
			</BetterText>
			<BetterText
				style={{
					color: '#9C9E9C',
					marginTop: 4,
				}}
			>
				{auth.user.profile.religion === 'Atheist' ? 'Thought' : 'Prayer'} for
				the day
			</BetterText>
			<BetterText
				style={{
					marginTop: 10,
				}}
			>
				{loading ? (
					<BetterText>Generating prayer...</BetterText>
				) : (
					<BetterText>{message.content}</BetterText>
				)}
			</BetterText>
		</View>
	)
}

export default TodaysPrayer
