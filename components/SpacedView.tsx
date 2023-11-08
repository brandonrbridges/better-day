import React from 'react'
import { View } from 'react-native'

type SpacedViewProps = {
	children: React.ReactNode
	style?: any
}

const SpacedView: React.FC<SpacedViewProps> = (props) => {
	const children = React.Children.map(props.children, (child, index) => {
		const isLastChild = React.Children.count(props.children) - 1 === index

		const style = isLastChild ? {} : { marginBottom: 20 }

		return <View style={style}>{child}</View>
	})

	return (
		<View
			style={{
				...props.style,
			}}
		>
			{children}
		</View>
	)
}

export default SpacedView
