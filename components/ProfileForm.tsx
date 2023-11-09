// React & React Native
import { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

// Redux
import { useAppDispatch, useAppSelector } from '../stores/hooks'

// Components
import BetterText from './BetterText'

// React Hook Form
import { Controller, useForm } from 'react-hook-form'

// Fetch
import { PATCH } from '../utils/fetch'

// Packages
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateProfile } from '../stores/reducers/auth.reducer'

const schema = yup.object().shape({
	age: yup.string(),
})

const ProfileForm = () => {
	const auth = useAppSelector(({ auth }) => auth)
	const dispatch = useAppDispatch()

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			age: null,
		},
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')

	const onSubmit = async (data) => {
		try {
			const response = await PATCH(`/users/${auth.user.id}/update-profile`, {
				...data,
				age: parseInt(data.age),
			})

			dispatch(updateProfile(response))

			setSuccess(true)
		} catch (error) {
			setSuccess(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		setValue('age', auth.user.profile.age?.toString())
	}, [auth])

	return (
		<View>
			{success && (
				<View
					style={{
						backgroundColor: '#59B95C',
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
						Registration Successful!
					</BetterText>
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

			<BetterText style={{ marginBottom: 4 }}>Age</BetterText>
			<Controller
				control={control}
				name='age'
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						keyboardType='numeric'
						placeholder='Age'
						autoCapitalize='none'
						style={{
							borderColor: '#AAA',
							borderRadius: 10,
							borderWidth: 1,
							// fontFamily: 'Aleo',
							marginBottom: 10,
							padding: 10,
						}}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
			{errors.age && (
				<View
					style={{
						marginBottom: 20,
					}}
				>
					<BetterText
						style={{
							color: 'red',
						}}
					>
						{errors.age.message}
					</BetterText>
				</View>
			)}

			<TouchableOpacity onPress={handleSubmit(onSubmit)}>
				<View
					style={{
						backgroundColor: '#59B95C',
						borderRadius: 10,
						marginTop: 10,
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
