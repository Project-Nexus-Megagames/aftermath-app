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

export type Location = {
	lat: number;
	lng: number;
};
export interface Team {
	homebase: Location;
}

export interface Unit {
	location: Location;
}

export interface User {
	username: string | undefined;
}

export interface Poi {
	_id: string;
	type: string;
	title: string;
	body?: string;
	comment?: string;
	location: Location;
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
