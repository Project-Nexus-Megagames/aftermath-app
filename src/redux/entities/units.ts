import { createSlice } from '@reduxjs/toolkit'; // Import from reactjs toolkit
import { gameServer } from '../../config/config';
import { apiCallBegan } from '../api'; // Import Redux API call
import { Unit } from '../../config/types';

interface UnitState {
	list: Unit[];
	loading: boolean;
	loaded: boolean;
	lastFetch: number | null;
	failedAttempts: number;
}

// Create entity slice of the store
const slice = createSlice({
	name: 'units',
	initialState: {
		list: [],
		loading: false,
		loaded: false,
		lastFetch: null,
		failedAttempts: 0
	} as UnitState,

	// Reducers - Events
	reducers: {
		unitsRequested: (units, action) => {
			console.log(`${action.type} Dispatched...`);
			units.loading = true;
		},
		unitsReceived: (units, action) => {
			console.log(`${action.type} Dispatched...`);
			units.list = action.payload;
			units.loading = false;
			units.lastFetch = Date.now();
			units.loaded = true;
		},
		unitsRequestFailed: (units, action) => {
			console.log(`${action.type} Dispatched`);
			units.failedAttempts++;
			units.loading = false;
		},
		unitAdded: (units, action) => {
			console.log(`${action.type} Dispatched`, action.payload);
			units.list.push(action.payload);
			units.loading = false;
		},
		unitDeleted: (units, action) => {
			console.log(`${action.type} Dispatched`);
			const index = units.list.findIndex((el) => el._id === action.payload._id);
			units.list.splice(index, 1);
		},
		unitUpdated: (units, action) => {
			console.log(`${action.type} Dispatched`, action.payload);
			const index = units.list.findIndex((el) => el._id === action.payload._id);
			units.list[index] = action.payload;
			units.loading = false;
		}
	}
});

// Action Export
export const {
	unitAdded,
	unitDeleted,
	unitsReceived,
	unitsRequested,
	unitsRequestFailed,
	unitUpdated
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
			onStart: unitsRequested.type,
			onSuccess: unitsReceived.type,
			onError: unitsRequestFailed.type
		})
	);
};
