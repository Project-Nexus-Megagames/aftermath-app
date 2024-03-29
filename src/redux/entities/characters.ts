import { createSelector, createSlice } from '@reduxjs/toolkit'; // Import from reactjs toolkit
import { gameServer } from '../../config/config';
import { apiCallBegan } from '../api'; // Import Redux API call
import { Character } from '../../config/types';
import { RootState } from '../store';

interface CharacterState {
	list: Character[];
	loading: boolean;
	loaded: boolean;
	lastFetch: number | null;
	failedAttempts: number;
}

// Create entity slice of the store
const slice = createSlice({
	name: 'characters',
	initialState: {
		list: [],
		loading: false,
		loaded: false,
		lastFetch: null,
		failedAttempts: 0
	} as CharacterState,

	// Reducers - Events
	reducers: {
		charactersRequested: (characters, action) => {
			console.log(`${action.type} Dispatched...`);
			characters.loading = true;
		},
		charactersReceived: (characters, action) => {
			console.log(`${action.type} Dispatched...`);
			characters.list = action.payload;
			characters.loading = false;
			characters.lastFetch = Date.now();
			characters.loaded = true;
		},
		charactersRequestFailed: (characters, action) => {
			console.log(`${action.type} Dispatched`);
			characters.failedAttempts++;
			characters.loading = false;
		},
		characterAdded: (characters, action) => {
			console.log(`${action.type} Dispatched`);
			characters.list.push(action.payload);
		},
		characterDeleted: (characters, action) => {
			console.log(`${action.type} Dispatched`);
			const index = characters.list.findIndex(
				(el) => el._id === action.payload._id
			);
			characters.list.splice(index, 1);
		},
		characterUpdated: (characters, action) => {
			console.log(`${action.type} Dispatched`);
			const index = characters.list.findIndex(
				(el) => el._id === action.payload._id
			);
			characters.list[index] = action.payload;
			characters.loading = false;
		}
	}
});

// Action Export
export const {
	characterAdded,
	characterDeleted,
	charactersReceived,
	charactersRequested,
	charactersRequestFailed,
	characterUpdated
} = slice.actions;

export default slice.reducer; // Reducer Export

// Action Creators (Commands)
const url = `${gameServer}api/characters`;

// Selector
export const getMyCharacter = createSelector(
	(state: RootState) => state.characters.list,
	(state: RootState) => state.auth.character,
	(state: RootState) => state.auth.user,
	(characters, character, user) => {
		if (character) return character;
		return characters.find((char) => char.username === user?.username);
	}
);

export const getPlayerCharacters = createSelector(
	(state: RootState) => state.characters.list,
	(characters) =>
		characters.filter((char) => char.tags?.some((el) => el === 'PC'))
);

export const getControl = createSelector(
	(state: RootState) => state.characters.list,
	(characters) =>
		characters.filter((char) => char.tags?.some((el) => el === 'Control'))
);

export const getCharacterById = (charId: string) =>
	createSelector(
		(state: RootState) => state.characters,
		(characters) => characters.list.find((char) => char._id === charId)
	);

// characters Loader into state
// @ts-ignore
// TODO
export const loadCharacters = (payload) => (dispatch) => {
	return dispatch(
		apiCallBegan({
			url,
			method: 'get',
			data: payload,
			onStart: charactersRequested.type,
			onSuccess: charactersReceived.type,
			onError: charactersRequestFailed.type
		})
	);
};
