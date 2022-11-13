// @ts-nocheck
import React, {
	createContext,
	ReactElement,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import { Socket } from 'socket.io-client';
import { useToast } from '@chakra-ui/react';
import { socket } from '../system/socket';
import { useAppDispatch, useAppSelector } from './typedStoreHooks';
import { poiAdded, poiUpdated, poiDeleted } from '../redux/entities/pois';

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
export const SocketContextProvider: React.FC<{
	children: ReactElement | ReactElement[];
}> = ({ children }) => {
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

		socket.on('updateClients', (data) => {
			console.log('updateClients');
			for (const el of data) {
				switch (el.model) {
					case 'Poi':
						reduxAction(poiUpdated(el));
						break;
					default:
						console.log(`Unable to update Redux for ${el.model}: ${el._id}`);
						break;
				}
			}
		});

		socket.on('createClients', (data) => {
			console.log('createClients');
			for (const el of data) {
				switch (el.model) {
					case 'Poi':
						reduxAction(poiAdded(el));
						break;
					default:
						console.log(`Unable to add Redux for ${el.model}: ${el._id}`);
						break;
				}
			}
		});

		socket.on('deleteClients', (data) => {
			console.log('deleteClients');
			for (const el of data) {
				switch (el.model) {
					case 'Poi':
						reduxAction(poiDeleted(el));
						break;
					default:
						console.log(`Unable to add Redux for ${el.model}: ${el.id}`);
						break;
				}
			}
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
			socket.off('connect_error');
			socket.off('updateClients');
			socket.off('createClients');
			socket.off('deleteClients');
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

		socket.auth = {
			character: 'testCharacter',
			username: 'testUser',
			version: '1.0'
		};
		if (!isConnected) socket.connect();
	};

	const value = useMemo(
		() => ({ socket, isConnected, connectSocket }),
		[socket, isConnected, connectSocket]
	);

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};

/** SocketHook provides the componant with access to the socket instance
 * @property socket - the socket instance
 * @property isConnected - status of the socket
 * @property connectSocket - connects socket if it isn't already connected
 */
export const useSocket = (): SocketHook => useContext(SocketContext);
