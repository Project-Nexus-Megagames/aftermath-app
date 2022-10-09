export interface character {
  _id: string;
  playerName: string;
  characterName: string;
  username?: string | undefined;
  characterTitle?: string | undefined;
  pronouns?: string | undefined;
  bio?: string | undefined;
  email: string;
  wiki?: string | undefined;
  timeZone?: string | undefined;
  tags?: string[] | undefined;
  control?: string[] | undefined;
  color: string;
  profilePicture?: string | undefined;
  team?: string | undefined;
	knownContacts: character[] | undefined
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
	//error: null,
}