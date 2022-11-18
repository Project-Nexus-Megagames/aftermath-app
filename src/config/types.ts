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
}

export type Location = {
	lat: number;
	lng: number;
};
export interface Team {
	homebase: Location;
}

export interface Unit {
	_id: string;
	location: Location;
	description: string;
	conditions: string[];
	team: string;
}

/* const UnitSchema = new Schema({
	model: { type: String, default: 'Unit' },
	description: {
		type: String,
		default: 'Grandmas with pitchforks'
	},
	conditions: [{ type: String, default: 'None' }],
	location: locationSchema,
	team: { type: ObjectId, ref: 'Team' }
}); */

export interface User {
	username: string | undefined;
}

export interface Poi {
	_id: string;
	type: string;
	title: string;
	body?: string;
	location: Location;
	creator?: string;
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
