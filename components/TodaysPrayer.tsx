// Types
import { UserReligion } from '@/types/User.types'

// React & React Native
import React from 'react'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setMessage } from '@/redux/reducers/message.reducer'

// Components
import BetterText from './BetterText'

// Fetch
import { POST } from '@/utils/fetch'

// Packages
import dayjs from 'dayjs'

const TodaysPrayer = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const calendar = useAppSelector(({ calendar }) => calendar)
	const message = useAppSelector(({ message }) => message)

	const dispatch = useAppDispatch()

	const [loading, setLoading] = useState(false)

	const getMessage = async () => {
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

			console.log(response)

			dispatch(setMessage(response))
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (loading) return

		const messageDate = dayjs(message.date)
		const today = dayjs()

		if (messageDate.isSame(today, 'day')) {
			return
		}

		getMessage()
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
				{auth.user.profile.religion === UserReligion.Atheist
					? "Today's Thought"
					: "Today's Prayer"}
			</BetterText>
			<BetterText
				style={{
					color: '#9C9E9C',
					marginTop: 4,
				}}
			>
				{auth.user.profile.religion === UserReligion.Atheist
					? 'Thought of the Day'
					: 'Prayer of the Day'}
			</BetterText>
			<BetterText
				style={{
					marginTop: 10,
				}}
			>
				{loading ? (
					<BetterText>
						{auth.user.profile.religion === UserReligion.Atheist
							? 'Generating thought...'
							: 'Generating prayer...'}
					</BetterText>
				) : (
					<BetterText>{message.content}</BetterText>
				)}
			</BetterText>
		</View>
	)
}

export default React.memo(TodaysPrayer)
