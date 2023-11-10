// @ts-nocheck: ENV
import { API_URL } from '@env'

// Redux
import { store } from '@/redux/configureStore'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const wrapper = async (
	url: string,
	method: Method,
	body?: any,
	headers?: HeadersInit
) => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
	}

	const { access_token } = store.getState().auth

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

export const GET = async (url: string, headers?: HeadersInit) => {
	return wrapper(url, 'GET', null, headers)
}

export const POST = (url: string, body: any, headers?: HeadersInit) => {
	return wrapper(url, 'POST', body, headers)
}

export const PATCH = (url: string, body: any, headers?: HeadersInit) => {
	return wrapper(url, 'PATCH', body, headers)
}
