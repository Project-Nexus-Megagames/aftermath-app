// @ts-nocheck
import React, { createContext, ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useToast } from '@chakra-ui/react';
import { socket } from '../system/socket';
import { useAppDispatch, useAppSelector } from './typedStoreHooks';

interface SocketHook {
	socket: Socket;
	isConnected?: boolean;
	connectSocket: () => void;
}

/** Context For Socket.io socket instance and its related functions and listners */
export const SocketContext = createContext<SocketHook>({
	socket,
	isConnected: socket.connected,
	connectSocket: () => null
});

/** Socket Provider wrapper for Socket.io instance */
export const SocketContextProvider: React.FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
	// TODO this is where the authenticated user would come from redux
	//const { user } = useAppSelector(s => s.common);
	const reduxAction = useAppDispatch();
	const toast = useToast();
	const connectToast = useRef();
	const [isConnected, setIsConnected] = useState(socket.connected);

	useEffect(() => {
		if (isConnected && connectToast.current) {
			toast.update(connectToast.current, {
				//description: `${user?.username} Connected to sockets!`,
				description: `TestUser Connected to sockets!`,
				status: 'success'
			});
		}
	}, [isConnected]);

	useEffect(() => {
		socket.on('connect', () => {
			setIsConnected(true);
		});

		socket.on('disconnect', () => {
			setIsConnected(false);
		});

		socket.on('error', (error) => {
			logger.info('[SOCKET ERROR]', error);
			// logger.error(error.message);
		});

		socket.on('connect_error', () => {
			setTimeout(() => {
				socket.connect();
			}, 10000);
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('connect_error');
		};
	}, []);

	//useEffect(() => {
	//  if (user !== undefined) {
	//    const sessionID = localStorage.getItem("sessionID");

	//    toast({
	//      description: `${user.id}`,
	//      status: 'info',
	//    })

	//    socket.auth = { userId: user.id, username: user.username };

	//    if (sessionID) socket.auth = { sessionID, userId: user.id, username: user.username }
	//    else socket.auth = { userId: user.id, username: user.username };

	//    logger.info(`[SOCKET] ~ Auth:`, socket.auth);
	//  }

	//  if (!isConnected) connectSocket();
	//}, [user]);

	/**
	 * Connects socket to the socket server if it isn't already connected
	 */
	const connectSocket = () => {
		connectToast.current = toast({
			//description: `Connecting ${user?.username} to sockets...`,
			description: `Connecting TestUser to sockets...`,
			status: 'loading',
			position: 'bottom-right'
		});

		socket.auth = { character: 'testCharacter', username: 'testUser', version: '1.0' };
		console.log(socket);
		if (!isConnected) socket.connect();
	};

	const value = useMemo(() => ({ socket, isConnected, connectSocket }), [socket, isConnected, connectSocket]);

	return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

/** SocketHook provides the componant with access to the socket instance
 * @property socket - the socket instance
 * @property isConnected - status of the socket
 * @property connectSocket - connects socket if it isn't already connected
 */
export const useSocket = (): SocketHook => useContext(SocketContext);
