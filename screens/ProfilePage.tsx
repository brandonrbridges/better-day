// React & React Native
import React, { useState } from 'react'
import { Alert, Image, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {
	ImagePickerResponse,
	launchImageLibrary,
} from 'react-native-image-picker'

import ImageResizer from 'react-native-image-resizer'

// Stores
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout, updateProfilePicture } from '../redux/reducers/auth.reducer'

// Utils
import { UPLOAD } from '@/utils/fetch'

// Components
import BetterText from '../components/BetterText'
import SpacedView from '../components/SpacedView'
import ProfileForm from '../components/ProfileForm'

export default function ProfileScreen() {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	const handleLogout = () => dispatch(logout())

	const handleSelectImage = async () => {
		await launchImageLibrary(
			{
				mediaType: 'photo',
				quality: 1,
				selectionLimit: 1,
				includeBase64: true,
			},
			async (response: ImagePickerResponse) => {
				if (response.errorCode) {
					Alert.alert('Error', response.errorMessage)
					return
				}

				if (response.errorMessage) {
					Alert.alert('Error', response.errorMessage)
					return
				}

				const resizedImage = await ImageResizer.createResizedImage(
					response.assets[0].uri,
					800, // width
					800, // height
					'PNG', // format
					80, // quality
					0, // rotation
					null, // outputPath
					false // keepMeta
				)

				const formData = new FormData()

				// @ts-ignore
				formData.append('file', {
					uri: resizedImage.uri,
					name: 'profile-picture.png',
					type: 'image/png',
				})

				formData.append('id', auth.user.id)

				const upload = await UPLOAD(`/users/upload/profile-picture`, formData)

				console.log('[Better Day] Uploaded profile picture:', upload.url)

				dispatch(updateProfilePicture(upload.url))
			}
		)
	}

	return (
		<ScrollView>
			<SpacedView
				style={{
					padding: 20,
				}}
			>
				<View
					style={{
						alignItems: 'center',
						backgroundColor: '#FFF',
						borderRadius: 10,
						flexDirection: 'row',
						padding: 10,
					}}
				>
					<TouchableOpacity onPress={handleSelectImage}>
						<View
							style={{
								alignItems: 'center',
								backgroundColor: '#F1F1F1',
								borderRadius: 10,
								height: 80,
								justifyContent: 'center',
								marginRight: 10,
								overflow: 'hidden',
								position: 'relative',
								width: 80,
							}}
						>
							<Icon name='camera' size={30} color='#dce1db' />
							<Image
								source={{
									uri: auth.user.profile_picture ?? null,
								}}
								style={{
									position: 'absolute',
									height: '100%',
									objectFit: 'cover',
									width: '100%',
								}}
							/>
						</View>
					</TouchableOpacity>
					<View>
						<BetterText
							style={{
								fontSize: 16,
							}}
						>
							{auth.user.first_name} {auth.user.last_name}
						</BetterText>
						<View
							style={{
								flexDirection: 'row',
								marginTop: 4,
							}}
						>
							<BetterText
								style={{
									color: '#9C9E9C',
									marginRight: 10,
								}}
							>
								Level: 10
							</BetterText>
							<BetterText
								style={{
									color: '#9C9E9C',
								}}
							>
								Days in a Row: {auth.user.profile.consecutive_days}
							</BetterText>
						</View>
					</View>
				</View>

				<TouchableOpacity onPress={handleLogout}>
					<View
						style={{
							backgroundColor: '#FFF',
							borderRadius: 10,
							marginTop: 10,
							padding: 10,
						}}
					>
						<BetterText>Logout</BetterText>
					</View>
				</TouchableOpacity>

				<View
					style={{
						backgroundColor: '#FFF',
						borderRadius: 10,
						padding: 10,
					}}
				>
					<BetterText style={{ marginBottom: 10 }}>Preferences</BetterText>

					<ProfileForm />
				</View>
			</SpacedView>
		</ScrollView>
	)
}
