export type User = {
	id: string
	email: string
	first_name: string
	last_name: string
	profile: Profile
}

export type Profile = {
	age?: number
	religion?: UserReligion
	bible_excerpts?: boolean
	length_of_message?: number
}

export enum UserReligion {
	Atheist = 'Atheist',
	Christian = 'Christian',
}
