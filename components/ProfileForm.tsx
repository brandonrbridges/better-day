// React & React Native
import { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

// Redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateProfile } from '@/redux/reducers/auth.reducer'

// Components
import BetterText from './BetterText'

// React Hook Form
import { Controller, useForm } from 'react-hook-form'

// Fetch
import { PATCH } from '@/utils/fetch'

// Packages
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
	bible_excerpts: yup.boolean(),
	length_of_message: yup.number(),
})

const ProfileForm = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	const {
		control,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			bible_excerpts: true,
			length_of_message: 1,
		},
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')

	const bibleExcerptsValue = watch('bible_excerpts')
	const lengthOfMessageValue = watch('length_of_message')

	const onSubmit = async (data) => {
		try {
			const response = await PATCH(
				`/users/${auth.user.id}/update-profile`,
				data
			)

			dispatch(updateProfile(response))

			setSuccess(true)
		} catch (error) {
			setSuccess(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		setValue('bible_excerpts', auth.user.profile.bible_excerpts)
	}, [auth])

	return (
		<View>
			{success && (
				<View
					style={{
						backgroundColor: '#DAE1DA',
						borderRadius: 10,
						marginBottom: 20,
						padding: 10,
					}}
				>
					<BetterText>Profile updated successfully!</BetterText>
				</View>
			)}

			{error && !success && (
				<View
					style={{
						backgroundColor: 'red',
						borderRadius: 10,
						marginBottom: 20,
						padding: 10,
					}}
				>
					<BetterText
						style={{
							color: '#FFF',
						}}
					>
						Error: {error}
					</BetterText>
				</View>
			)}

			<BetterText style={{ marginBottom: 4 }}>Bible Extracts?</BetterText>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: 10,
					width: '100%',
				}}
			>
				<TouchableOpacity
					onPress={() => setValue('bible_excerpts', true)}
					style={{
						width: '49%',
					}}
				>
					<View
						style={[
							{
								borderColor: '#AAA',
								borderRadius: 10,
								borderWidth: 1,
								padding: 10,
							},
							bibleExcerptsValue && {
								borderColor: '#DAE1DA',
								backgroundColor: '#DAE1DA',
							},
						]}
					>
						<BetterText
							style={{
								textAlign: 'center',
							}}
						>
							Yes
						</BetterText>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setValue('bible_excerpts', false)}
					style={{
						width: '49%',
					}}
				>
					<View
						style={[
							{
								borderColor: '#AAA',
								borderRadius: 10,
								borderWidth: 1,
								padding: 10,
							},
							!bibleExcerptsValue && {
								borderColor: '#DAE1DA',
								backgroundColor: '#DAE1DA',
							},
						]}
					>
						<BetterText
							style={{
								textAlign: 'center',
							}}
						>
							No
						</BetterText>
					</View>
				</TouchableOpacity>
			</View>

			<BetterText style={{ marginBottom: 4 }}>
				Length of Daily Message
			</BetterText>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<TouchableOpacity
					onPress={() => setValue('length_of_message', 1)}
					style={{
						width: '32%',
					}}
				>
					<View
						style={[
							{
								borderColor: '#DAE1DA',
								borderRadius: 10,
								borderWidth: 1,
								padding: 10,
							},
							lengthOfMessageValue === 1 && {
								borderColor: '#DAE1DA',
								backgroundColor: '#DAE1DA',
							},
						]}
					>
						<BetterText
							style={{
								textAlign: 'center',
							}}
						>
							1 Min
						</BetterText>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setValue('length_of_message', 3)}
					style={{
						width: '32%',
					}}
				>
					<View
						style={[
							{
								borderColor: '#DAE1DA',
								borderRadius: 10,
								borderWidth: 1,
								padding: 10,
							},
							lengthOfMessageValue === 3 && {
								borderColor: '#DAE1DA',
								backgroundColor: '#DAE1DA',
							},
						]}
					>
						<BetterText
							style={{
								textAlign: 'center',
							}}
						>
							3 Mins
						</BetterText>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setValue('length_of_message', 5)}
					style={{
						width: '32%',
					}}
				>
					<View
						style={[
							{
								borderColor: '#DAE1DA',
								borderRadius: 10,
								borderWidth: 1,
								padding: 10,
							},
							lengthOfMessageValue === 5 && {
								borderColor: '#DAE1DA',
								backgroundColor: '#DAE1DA',
							},
						]}
					>
						<BetterText
							style={{
								textAlign: 'center',
							}}
						>
							5 Mins
						</BetterText>
					</View>
				</TouchableOpacity>
			</View>

			<TouchableOpacity onPress={handleSubmit(onSubmit)}>
				<View
					style={{
						backgroundColor: '#59B95C',
						borderRadius: 10,
						marginTop: 20,
						padding: 10,
					}}
				>
					<BetterText
						style={{
							color: '#FFF',
							fontSize: 16,
							textAlign: 'center',
						}}
					>
						Update Profile
					</BetterText>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default ProfileForm
