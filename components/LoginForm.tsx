// React & React Native
import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'

// Stores
import { useAuthContext } from '../stores/AuthContext'

// Component
import BetterText from './BetterText'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'

// Fetch
import { GET, POST } from '../utils/fetch'

// Packages
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
})

const LoginForm = () => {
	const { state: authState, dispatch: authDispatch } = useAuthContext()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')

	const onSubmit = async (data) => {
		try {
			const { access_token } = await POST('/auth/login', data)

			const user = await GET('/auth/me', access_token)

			setSuccess(true)

			authDispatch({
				type: 'LOGIN',
				payload: user,
			})

			setTimeout(() => {
				authDispatch({
					type: 'SET_TOKEN',
					payload: access_token,
				})
			}, 1500)
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
						Login Successful!
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
							fontFamily: 'Aleo',
							marginBottom: 10,
							padding: 10,
						}}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
			{errors.email && (
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
						{errors.email.message}
					</BetterText>
				</View>
			)}

			<BetterText style={{ marginBottom: 4 }}>Password</BetterText>
			<Controller
				control={control}
				name='password'
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder='Password'
						autoCapitalize='none'
						autoComplete='password'
						secureTextEntry
						style={{
							borderColor: '#AAA',
							borderRadius: 10,
							borderWidth: 1,
							fontFamily: 'Aleo',
							marginBottom: 10,
							padding: 10,
						}}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
			{errors.password && (
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
						{errors.password.message}
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
						Login
					</BetterText>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default LoginForm
