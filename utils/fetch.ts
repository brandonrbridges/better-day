// @ts-nocheck: ENV
import { API_URL } from '@env'

// Stores
import { useAuthContext } from '../stores/AuthContext'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const wrapper = async (
	url: string,
	method: Method,
	body?: any,
	access_token?: string,
	headers?: HeadersInit
) => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
	}

	if (access_token) {
		defaultHeaders['Authorization'] = `Bearer ${access_token}`
	}

	const config: RequestInit = {
		method: method,
		headers: {
			...defaultHeaders,
			...headers,
		},
	}

	if (body) {
		config.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(API_URL + url, config)
		const json = await response.json()

		if (!response.ok) {
			throw new Error(json.message || 'An error occurred while fetching data')
		}

		return json
	} catch (error) {
		throw new Error(error.message || 'Network response was not ok')
	}
}

export const GET = async (
	url: string,
	access_token?: string,
	headers?: HeadersInit
) => {
	return wrapper(url, 'GET', null, access_token, headers)
}

export const POST = (
	url: string,
	body: any,
	access_token?: string,
	headers?: HeadersInit
) => {
	return wrapper(url, 'POST', body, access_token, headers)
}
