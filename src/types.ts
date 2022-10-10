export interface character {
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
	knownContacts: character[]
}

export interface team {}

export interface unit {}

export interface user {
	username: string | undefined
}

export interface auth {
	user: user,
	character: character | undefined,
	login: boolean,
	lastLogin: number | null,
	control: boolean,
	users: user[],
	loadComplete: boolean
	//error: null,
}

export interface apiCall {
  url: string;
  method: 'get' | 'post';
  data: { [index: string]: unknown };
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}