// TODO @ts-nocheck

import { io } from 'socket.io-client';
import { gameServer } from '../config/config';
// import { Socket } from "./socket.types";

const uri = gameServer;
/**
 * Original connection of socket.io that will connect the entire system. This will then be used by the SocketProvider
 */
export const socket = io(uri, {
	withCredentials: true,
	autoConnect: false
});
