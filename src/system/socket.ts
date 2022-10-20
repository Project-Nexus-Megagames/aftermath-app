import { io } from 'socket.io-client';
import { gameServer } from '../config/config';
// import store from "./redux/store";
import { user, character } from '../config/types';

const URL = gameServer;
const socket = io(URL, { autoConnect: false });

// DEBUG event showing any event thrown over the socket in console
// socket.onAny((event, ...args) => {
//   console.log(args);
// });

export function initConnection(user: user, character: character, version: string) {
	console.log('Socket Connecting....');
	socket.auth = { username: user.username, character: character ? character.characterName : 'Unassigned', version };

	//console.log(socket);
	socket.connect();
}

export default socket;
