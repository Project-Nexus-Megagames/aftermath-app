import React, { useState } from 'react';
import { MarkerForm } from './MarkerForm';
import { Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Text } from '@chakra-ui/react';
import { Location } from '../../config/types';

interface DrawerProps {
	isOpen: boolean;
	closeDrawer: () => void;
	newLocation: Location;
}

export const NewMarker: React.FC<DrawerProps> = ({ isOpen: open, closeDrawer, newLocation }) => {
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
			<DrawerContent>
				<DrawerBody>
					<MarkerForm onCancel={() => closeDrawer()} onSubmit={() => closeDrawer()} location={newLocation} />;
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
