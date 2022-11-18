import React from 'react';
import {
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Text,
	Button
} from '@chakra-ui/react';
import { Poi } from '../../config/types';
import { useSocket } from '../../hooks/webSocketHook';

interface DrawerProps {
	isOpen: boolean;
	closeDrawer: () => void;
	poi: Poi;
}

export const MapDrawer: React.FC<DrawerProps> = ({
	isOpen: open,
	closeDrawer,
	poi
}) => {
	const { onOpen, onClose } = useDisclosure();
	const { socket } = useSocket();

	const handleDeletePoi = (id: string) => {
		socket.emit('request', { route: 'poi', action: 'delete', data: id });
	};

	return (
		<Drawer
			isOpen={open}
			placement='right'
			size='md'
			onClose={() => {
				closeDrawer();
			}}
		>
			<DrawerOverlay />
			<DrawerContent bgColor='#0f131a'>
				<DrawerCloseButton size='xs' top='0px' right='0px' />
				<DrawerHeader>
					<Text color='white'>Title of {poi.title}</Text>
				</DrawerHeader>
				<DrawerBody>
					<div>
						<Text color='white'>Details: {poi.body}</Text>
						<Button onClick={() => handleDeletePoi(poi._id)}>Delete</Button>
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
