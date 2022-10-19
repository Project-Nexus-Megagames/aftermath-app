import { createSlice } from "@reduxjs/toolkit"; // Import from reactjs toolkit
import { apiCallBegan } from "../api"; // Import Redux API call
// import playTrack from "../../scripts/audio";
import jwtDecode from "jwt-decode"; // JSON web-token decoder
import { character, user } from "../../types";

interface AuthState {
  user: user | undefined | null;
  character: character | undefined | null;
  login: boolean;
  loading: boolean;
  lastLogin: number | null;
  control: boolean;
  users: user[];
  error: string | null;
  loadComplete: boolean;
}

// Create entity slice of the store
const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    character: null,
    login: false,
    loading: false,
    lastLogin: null,
    control: false,
    users: [],
    error: null,
    loadComplete: false,
  } as AuthState,
  // Reducers - Events
  reducers: {
    // this will become hadleLogin from app.js
    loginRequested: (auth, action) => {
      console.log(`${action.type} Dispatched...`);
      auth.loading = true;
    },
    authReceived: (auth, action) => {
      console.log(`${action.type} Dispatched...`);

      const jwt = action.payload.token;
      localStorage.setItem("candi-token", jwt);
      const user: user = jwtDecode(jwt);
      console.log(localStorage);

      //if (user.roles.some(el => el === "Control")) auth.control = true;

      auth.error = null;
      auth.user = user;
      auth.lastLogin = Date.now();
      auth.loading = false;
      auth.login = true;
    },
    authRequestFailed: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      auth.loading = false;
      auth.error = action.payload;
    },
    loginSocket: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      // @ts-ignore
      // TODO
      auth.socket = action.payload.me;
    },
    finishLoading: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      auth.loadComplete = true;
    },
    setCharacter: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      auth.character = action.payload;
      if (action.payload.tags.some((el: string) => el.toLowerCase() === "control")) auth.control = true;
      // initConnection(auth.user, auth.team, auth.version);
    },
    setControl: (auth, action) => {
      auth.control = action.payload.control;
    },
    clearAuthError: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      auth.error = null;
    },
    signOut: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      localStorage.removeItem("candi-token");
      auth.user = null;
      auth.login = false;
      auth.loading = false;
      auth.lastLogin = null;
      auth.error = null;
    },
    usersRecieved: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      auth.users = action.payload;
    },
    updateUser: (auth, action) => {
      console.log(`${action.type} Dispatched`);
      auth.user = action.payload.user;
    },
  },
});

// Action Export
export const { authReceived, loginRequested, authRequestFailed, loginSocket, clearAuthError, signOut, updateUser, usersRecieved, finishLoading, setCharacter, setControl } = slice.actions;

export default slice.reducer; // Reducer Export

// Action Creators (Commands)
const url = "https://nexus-central-server.herokuapp.com/auth";

// aircraft Loader into state
// @ts-ignore
// TODO
export const loginUser = (payload) => (dispatch: T) => {
  return dispatch(
    apiCallBegan({
      url,
      method: "post",
      data: payload,
      onStart: loginRequested.type,
      onSuccess: authReceived.type,
      onError: authRequestFailed.type,
    })
  );
};
