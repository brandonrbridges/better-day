// React & React Native
import React from 'react'
import { Text, View } from 'react-native'

// Components
import BetterText from './BetterText'

const Overview = () => {
	return (
		<View
			style={{
				backgroundColor: '#FFF',
				borderRadius: 10,
				padding: 20,
			}}
		>
			<OverviewHeader />
			<EventList />
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

const EventList = () => {
	const events = [
		{
			title: 'Meet Brian about Partnership',
		},
		{
			title: 'Meet Brian about Partnership',
		},
		{
			title: 'Meet Brian about Partnership',
		},
	]

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

	return (
		<View
			style={{
				backgroundColor: '#DAE1DA',
				borderRadius: 10,
				padding: 10,
			}}
		>
			{events.map((event, index) => {
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
