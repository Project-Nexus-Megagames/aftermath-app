import { createSlice } from '@reduxjs/toolkit'; // Import from reactjs toolkit
import { gameServer } from '../../config/config';
import { apiCallBegan } from '../api'; // Import Redux API call
import { Poi } from '../../config/types';

interface PoiState {
	list: Poi[];
	loading: boolean;
	loaded: boolean;
	lastFetch: number | null;
	failedAttempts: number;
}

// Create entity slice of the store
const slice = createSlice({
	name: 'pois',
	initialState: {
		list: [],
		loading: false,
		loaded: false,
		lastFetch: null,
		failedAttempts: 0
	} as PoiState,

	// Reducers - Events
	reducers: {
		poisRequested: (pois, action) => {
			console.log(`${action.type} Dispatched...`);
			pois.loading = true;
		},
		poisReceived: (pois, action) => {
			console.log(`${action.type} Dispatched...`);
			pois.list = action.payload;
			pois.loading = false;
			pois.lastFetch = Date.now();
			pois.loaded = true;
		},
		poisRequestFailed: (pois, action) => {
			console.log(`${action.type} Dispatched`);
			pois.failedAttempts++;
			pois.loading = false;
		},
		poiAdded: (pois, action) => {
			console.log(`${action.type} Dispatched`, action.payload);
			pois.list.push(action.payload);
			pois.loading = false;
		},
		poiDeleted: (pois, action) => {
			console.log(`${action.type} Dispatched`);
			const index = pois.list.findIndex((el) => el._id === action.payload._id);
			pois.list.splice(index, 1);
		},
		poiUpdated: (pois, action) => {
			console.log(`${action.type} Dispatched`, action.payload);
			const index = pois.list.findIndex((el) => el._id === action.payload._id);
			pois.list[index] = action.payload;
			pois.loading = false;
		}
	}
});

// Action Export
export const {
	poiAdded,
	poiDeleted,
	poisReceived,
	poisRequested,
	poisRequestFailed,
	poiUpdated
} = slice.actions;

export default slice.reducer; // Reducer Export

// Action Creators (Commands)
const url = `${gameServer}api/pois`;

// Selectors

// Loader into state
// @ts-ignore
// TODO;

export const loadPois = (payload) => (dispatch) => {
	return dispatch(
		apiCallBegan({
			url,
			method: 'get',
			data: payload,
			onStart: poisRequested.type,
			onSuccess: poisReceived.type,
			onError: poisRequestFailed.type
		})
	);
};
