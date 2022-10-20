import React, { useState } from 'react';
import { useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Poi } from '../../config/types';

interface DrawerProps {
	isOpen: boolean;
	closeDrawer: () => void;
	poi: Poi;
}

export const MapDrawer: React.FC<DrawerProps> = ({ isOpen: open, closeDrawer, poi }) => {
	const { onOpen, onClose } = useDisclosure();

	return (
		<Drawer
			isOpen={open}
			placement="right"
			size="md"
			onClose={() => {
				closeDrawer();
			}}
		>
			<DrawerOverlay />
			<DrawerContent bgColor="#0f131a">
				<DrawerCloseButton size="xs" top="0px" right="0px" />
				<DrawerHeader>
					<Text color="white">Title of {poi.title}</Text>
				</DrawerHeader>
				<DrawerBody>
					<Text color="white">Details: {poi.body}</Text>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
