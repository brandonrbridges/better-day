import { AiResponse } from './Ai.types'

export type User = {
	id: string
	email: string
	first_name: string
	last_name: string
	profile_picture?: string
	profile: Profile
	ai_responses: AiResponse[]
}

export type Profile = {
	age?: number
	religion?: UserReligion
	bible_excerpts?: boolean
	length_of_message?: number
	last_login?: string
	consecutive_days?: number
}

export enum UserReligion {
	Atheist = 'Atheist',
	Christian = 'Christian',
}
