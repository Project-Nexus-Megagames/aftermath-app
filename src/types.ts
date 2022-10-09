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
}

export interface team {}

export interface unit {}
