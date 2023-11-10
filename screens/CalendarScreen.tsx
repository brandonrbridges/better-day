// React & React Native
import { useEffect, useState } from 'react'
import { View } from 'react-native'

// React Native Packages
import { ScrollView } from 'react-native-gesture-handler'

// Redux
import { useAppSelector } from '@/redux/hooks'

// Components
import BetterText from '@/components/BetterText'
import Calendar from '@/components/Calendar'
import SpacedView from '@/components/SpacedView'
import TodaysPrayer from '@/components/TodaysPrayer'

// Packages
import dayjs from 'dayjs'

export default function CalendarScreen() {
	const calendar = useAppSelector(({ calendar }) => calendar)

	const [selectedDate, setSelectedDate] = useState(new Date())
	const [displayedEvents, setDisplayedEvents] = useState([])

	const handleDateChange = (date) => setSelectedDate(date)

	const events = calendar.events.map((event) => ({
		startDate: dayjs(event.startDate).toDate(),
		endDate: dayjs(event.endDate).toDate(),
		title: event.title,
		notes: event.notes,
	}))

	useEffect(() => {
		const events = calendar.events.filter((event) => {
			const eventStartDate = dayjs(event.startDate)
			const eventEndDate = dayjs(event.endDate)

			if (eventStartDate.isSame(selectedDate, 'day')) return true
		})

		setDisplayedEvents(events)
	}, [selectedDate])

	return (
		<ScrollView
			style={{
				flex: 1,
			}}
		>
			<SpacedView
				style={{
					padding: 20,
				}}
			>
				<Calendar events={events} onDateChange={handleDateChange} />

				{displayedEvents.map((event, index) => {
					return (
						<View
							key={index}
							style={{
								alignItems: 'center',
								backgroundColor: '#FFF',
								borderRadius: 10,
								flexDirection: 'row',
								padding: 10,
							}}
						>
							<View
								style={{
									backgroundColor: '#F1F1F1',
									borderRadius: 10,
									height: 50,
									marginRight: 10,
									width: 50,
								}}
							></View>
							<View>
								<BetterText
									style={{
										fontSize: 16,
										marginBottom: 4,
									}}
								>
									{event.title}
								</BetterText>
								<BetterText
									style={{
										color: '#9C9E9C',
									}}
								>
									{event.notes || 'No notes for this event'}
								</BetterText>
							</View>
						</View>
					)
				})}

				<TodaysPrayer />
			</SpacedView>
		</ScrollView>
	)
}
