// React & React Native
import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'

// Component
import BetterText from './BetterText'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'

// Fetch
import { POST } from '@/utils/fetch'

// Packages
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type Stage = 'email' | 'code' | 'password'

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
})

const ForgotPasswordForm = ({ navigation }) => {
	const [stage, setStage] = useState<Stage>('email')

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			code: '',
			password: '',
			confirmPassword: '',
		},
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')

	const requestCode = async (data) => {
		try {
			await POST('/auth/request-password-reset', data)

			setStage('code')
		} catch (error) {
			setSuccess(false)

			setError(error.message)
		}
	}

	const resetPassword = async (data) => {
		if (data.password !== data.confirmPassword) {
			setError('Passwords do not match')

			return
		}

		try {
			await POST('/auth/reset-password', data)

			setSuccess(true)

			setTimeout(() => {
				navigation.navigate('Login')
			}, 2000)
		} catch (error) {
			setSuccess(false)

			setError(error.message)
		}
	}

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
						Password reset successful.
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

			{stage === 'email' && (
				<>
					<BetterText style={{ marginBottom: 4 }}>Email Address</BetterText>
					<Controller
						control={control}
						name='email'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='Email'
								autoCapitalize='none'
								autoComplete='email'
								autoFocus
								style={{
									borderColor: '#AAA',
									borderRadius: 10,
									borderWidth: 1,
									marginBottom: 10,
									padding: 10,
								}}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>

					<TouchableOpacity onPress={handleSubmit(requestCode)}>
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
								Send Reset Email
							</BetterText>
						</View>
					</TouchableOpacity>
				</>
			)}

			{stage === 'code' && (
				<>
					<BetterText style={{ marginBottom: 4 }}>Reset Code</BetterText>
					<Controller
						control={control}
						name='code'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='Reset Code'
								autoCapitalize='none'
								autoComplete='email'
								autoFocus
								style={{
									borderColor: '#AAA',
									borderRadius: 10,
									borderWidth: 1,
									marginBottom: 10,
									padding: 10,
								}}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>

					<TouchableOpacity onPress={() => setStage('password')}>
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
								Enter Code
							</BetterText>
						</View>
					</TouchableOpacity>
				</>
			)}

			{stage === 'password' && (
				<>
					<BetterText style={{ marginBottom: 4 }}>New Password</BetterText>
					<Controller
						control={control}
						name='password'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='New Password'
								autoCapitalize='none'
								style={{
									borderColor: '#AAA',
									borderRadius: 10,
									borderWidth: 1,
									marginBottom: 10,
									padding: 10,
								}}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>

					<BetterText style={{ marginBottom: 4 }}>
						Confirm New Password
					</BetterText>
					<Controller
						control={control}
						name='confirmPassword'
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								placeholder='Confirm New Password'
								autoCapitalize='none'
								style={{
									borderColor: '#AAA',
									borderRadius: 10,
									borderWidth: 1,
									marginBottom: 10,
									padding: 10,
								}}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>

					<TouchableOpacity onPress={handleSubmit(resetPassword)}>
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
								Reset Password
							</BetterText>
						</View>
					</TouchableOpacity>
				</>
			)}
		</View>
	)
}

export default ForgotPasswordForm
