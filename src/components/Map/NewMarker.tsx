import React from 'react';
import { MarkerForm } from './MarkerForm';
import {
	Drawer,
	DrawerBody,
	DrawerOverlay,
	DrawerContent
} from '@chakra-ui/react';
import { Location } from '../../config/types';

interface DrawerProps {
	isOpen: boolean;
	closeDrawer: () => void;
	newLocation: Location;
}

export const NewMarker: React.FC<DrawerProps> = ({
	isOpen: open,
	closeDrawer,
	newLocation
}) => {
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
			<DrawerContent>
				<DrawerBody>
					<MarkerForm
						onCancel={() => closeDrawer()}
						onSubmit={() => closeDrawer()}
						location={newLocation}
					/>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
