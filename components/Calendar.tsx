// React & React Native
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

// Redux
import { useAppSelector } from '@/redux/hooks'

type CalendarEvent = {
	startDate: Date
	endDate: Date
	title: string
	notes: string
}

type CalendarProps = {
	events: CalendarEvent[]
	onDateChange: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = (props) => {
	const calendar = useAppSelector(({ calendar }) => calendar)

	const [selectedDate, setSelectedDate] = useState(new Date())

	const handleDateChange = (date) => {
		setSelectedDate(date)
		props.onDateChange(date)
	}

	const daysOfWeek = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	]

	const firstDayOfMonth = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth(),
		1
	)

	const lastDayOfMonth = new Date(
		selectedDate.getFullYear(),
		selectedDate.getMonth() + 1,
		0
	)

	const dayCells = []
	const daysInMonth = lastDayOfMonth.getDate()

	for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
		dayCells.push(<View key={'empty-' + i} style={styles.dayCell} />)
	}

	for (let i = 1; i <= daysInMonth; i++) {
		const currentDate = new Date(
			selectedDate.getFullYear(),
			selectedDate.getMonth(),
			i
		)

		const isSelected =
			selectedDate.getDate() === i &&
			selectedDate.getMonth() === currentDate.getMonth()

		const isToday = currentDate.toDateString() === new Date().toDateString()

		const hasEvent = props.events.some((event) => {
			const eventDate = new Date(event.startDate)
			return eventDate.toDateString() === currentDate.toDateString()
		})

		dayCells.push(
			<View key={currentDate.toDateString()} style={styles.dayCell}>
				<TouchableOpacity onPress={() => handleDateChange(currentDate)}>
					<View
						style={[
							isToday ? styles.todayCell : null,
							isSelected ? styles.selectedDayCell : null,
						]}
					>
						<Text
							style={[
								isToday ? styles.todayText : null,
								isSelected ? styles.selectedDayText : styles.dayText,
							]}
						>
							{i}
						</Text>
					</View>
				</TouchableOpacity>
				{hasEvent && <View style={styles.eventBubble} />}
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{selectedDate.toLocaleDateString('en-US', {
					month: 'long',
					year: 'numeric',
				})}
			</Text>
			<View style={styles.daysOfWeekContainer}>
				{daysOfWeek.map((day) => (
					<Text key={day} style={styles.daysOfWeekText}>
						{day.slice(0, 3)}
					</Text>
				))}
			</View>
			<View style={styles.daysContainer}>{dayCells}</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	title: {
		fontFamily: 'Aleo',
		fontSize: 18,
		marginBottom: 10,
		textAlign: 'center',
	},
	daysOfWeekContainer: {
		borderTopColor: '#DDD',
		borderTopWidth: 1,
		borderBottomColor: '#DDD',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10,
		paddingBottom: 10,
	},
	daysOfWeekText: {
		flex: 1,
		fontFamily: 'Aleo',
		textAlign: 'center',
	},
	daysContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	dayCell: {
		alignItems: 'center',
		height: 50,
		justifyContent: 'center',
		position: 'relative',
		width: `${99.9 / 7}%`,
	},
	dayText: {
		color: '#000',
		fontFamily: 'Aleo',
		fontSize: 16,
	},
	selectedDayCell: {
		backgroundColor: '#F48046',
		borderRadius: 50,
		alignItems: 'center',
		height: 30,
		justifyContent: 'center',
		width: 30,
	},
	selectedDayText: {
		color: '#FFF',
		fontFamily: 'Aleo',
		fontSize: 16,
	},
	todayCell: {
		backgroundColor: '#DDD',
		borderRadius: 50,
		alignItems: 'center',
		height: 30,
		justifyContent: 'center',
		width: 30,
	},
	todayText: {
		color: '#000',
	},
	eventBubble: {
		backgroundColor: '#F48046',
		borderRadius: 50,
		bottom: 0,
		position: 'absolute',
		height: 6,
		width: 6,
	},
})

export default React.memo(Calendar)
