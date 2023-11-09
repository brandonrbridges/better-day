// React & React Native
import React, { useState } from 'react'
import { TextInput, View, TouchableOpacity } from 'react-native'

// Components
import BetterText from './BetterText'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'

// Fetch
import { POST } from '../utils/fetch'

// Packages
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email is required'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	first_name: yup.string().required('First Name is required'),
	last_name: yup.string().required('Last Name is required'),
})

const RegisterForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
			first_name: '',
			last_name: '',
		},
	})

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState('')

	const onSubmit = async (data) => {
		try {
			const response = await POST('/auth/register', data)

			setSuccess(true)
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

			<BetterText style={{ marginBottom: 4 }}>First Name</BetterText>
			<Controller
				control={control}
				name='first_name'
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder='First Name'
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

			{errors.first_name && (
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
						{errors.first_name.message}
					</BetterText>
				</View>
			)}

			<BetterText style={{ marginBottom: 4 }}>Last Name</BetterText>
			<Controller
				control={control}
				name='last_name'
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder='Last Name'
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

			{errors.last_name && (
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
						{errors.last_name.message}
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
						Register
					</BetterText>
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default RegisterForm
