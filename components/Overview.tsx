// React & React Native
import React from 'react'
import { Text, View } from 'react-native'

// Redux
import { useAppSelector } from '../stores/hooks'

// Components
import BetterText from './BetterText'

// Packages
import dayjs from 'dayjs'

const Overview = () => {
	const events = useAppSelector(({ calendar }) => calendar.events)

	const todaysEvents = events.filter((event) => {
		const today = dayjs()

		const eventDate = dayjs(event.startDate)

		if (today.isSame(eventDate, 'day')) {
			return true
		}
	})

	return (
		<View
			style={{
				backgroundColor: '#FFF',
				borderRadius: 10,
				padding: 20,
			}}
		>
			<OverviewHeader />
			<EventList events={todaysEvents} />
		</View>
	)
}

const OverviewHeader = () => {
	return (
		<View
			style={{
				alignItems: 'center',
				flexDirection: 'row',
				marginBottom: 20,
			}}
		>
			<View
				style={{
					alignItems: 'center',
					backgroundColor: '#F6F7F6',
					borderRadius: 10,
					height: 50,
					justifyContent: 'center',
					marginRight: 10,
					width: 50,
				}}
			>
				<BetterText
					style={{
						fontSize: 20,
					}}
				>
					10
				</BetterText>
				<BetterText>NOV</BetterText>
			</View>
			<View>
				<BetterText
					style={{
						fontSize: 16,
					}}
				>
					Meditation for today
				</BetterText>
				<BetterText
					style={{
						color: '#9C9E9C',
					}}
				>
					15 days of meditation challenge
				</BetterText>
			</View>
		</View>
	)
}

type EventListProps = {
	events: any[]
}

const EventList: React.FC<EventListProps> = (props) => {
	const EventItem = ({ style }) => {
		return (
			<View
				style={{
					alignItems: 'center',
					backgroundColor: '#FFF',
					borderRadius: 10,
					flexDirection: 'row',
					padding: 10,
					...style,
				}}
			>
				<View
					style={{
						alignItems: 'center',
						backgroundColor: '#F1F1F1',
						borderRadius: 10,
						height: 50,
						justifyContent: 'center',
						marginRight: 10,
						width: 50,
					}}
				>
					<Text>1</Text>
				</View>
				<View>
					<View
						style={{
							flexDirection: 'row',
							marginBottom: 4,
						}}
					>
						<Text
							style={{
								fontSize: 12,
								marginRight: 8,
							}}
						>
							8:30
						</Text>
						<Text
							style={{
								fontSize: 12,
							}}
						>
							30 minutes
						</Text>
					</View>
					<BetterText>Meet Brian about Partnership</BetterText>
				</View>
			</View>
		)
	}

	if (props.events.length === 0) {
		return <BetterText>You have no events today. Enjoy your day!</BetterText>
	}

	return (
		<View
			style={{
				backgroundColor: '#DAE1DA',
				borderRadius: 10,
				padding: 10,
			}}
		>
			{props.events.map((event, index) => {
				return (
					<EventItem
						key={index}
						style={
							index !== 0 && {
								marginTop: 10,
							}
						}
					/>
				)
			})}
		</View>
	)
}

export default Overview
