import React from 'react';
// import { useSelector } from 'react-redux';
import { Box, HStack } from '@chakra-ui/react';
import { SideBar } from '../Common/SideBar';
import { ControlMap } from '../Control/ControlMap';

const HomePage = () => {
	return (
		<Box bg='#F5F5F5'>
			<HStack spacing='0'>
				<SideBar />
				<ControlMap />
			</HStack>
		</Box>
	);
};
export default HomePage;
