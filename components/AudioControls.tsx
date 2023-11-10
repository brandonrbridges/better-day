// React & React Native
import { View } from 'react-native'

// React Native Packages
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'
import Icon from 'react-native-vector-icons/FontAwesome5'

// Components
import BetterText from './BetterText'

const AudioControls = () => {
	const progress = useSharedValue(0)
	const minimum = useSharedValue(0)
	const maximum = useSharedValue(100)

	return (
		<View>
			<View
				style={{
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<BetterText>00:17</BetterText>
				<BetterText>04:43</BetterText>
			</View>
			<View
				style={{
					marginTop: 20,
					marginBottom: 20,
				}}
			>
				<Slider
					progress={progress}
					minimumValue={minimum}
					maximumValue={maximum}
					theme={{
						minimumTrackTintColor: '#0E3E1B',
						bubbleBackgroundColor: '#0E3E1B',
					}}
				/>
			</View>
			<View
				style={{
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<View>
					<Icon name='backward' size={30} />
				</View>
				<View>
					<Icon name='play-circle' size={30} />
				</View>
				<View>
					<Icon name='forward' size={30} />
				</View>
			</View>
		</View>
	)
}

export default AudioControls
