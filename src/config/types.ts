export interface Character {
	_id: string;
	playerName: string;
	characterName: string;
	username?: string | undefined;
	characterTitle?: string;
	pronouns?: string;
	bio?: string;
	email: string;
	wiki?: string;
	timeZone?: string;
	tags?: string[];
	control?: string[];
	color: string;
	profilePicture?: string;
	team?: string;
	knownContacts: Character[];
}

export interface Team {}

export interface Unit {}

export interface User {
	username: string | undefined;
}

export interface Poi {
	username: string | undefined;
}
export interface Auth {
	user: User;
	character: Character | undefined;
	login: boolean;
	lastLogin: number | null;
	control: boolean;
	users: User[];
	loadComplete: boolean;
	//error: null,
}

export interface ApiCall {
	url: string;
	method: 'get' | 'post';
	data: { [index: string]: unknown };
	onStart?: string;
	onSuccess?: string;
	onError?: string;
}
