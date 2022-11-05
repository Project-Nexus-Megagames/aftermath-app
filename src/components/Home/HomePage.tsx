import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { VStack, Box } from '@chakra-ui/react';
import { AftermathMap } from '../Map/Map';
import NavigationBar from '../Common/NavigationBar';

const HomePage = () => {
	return (
		<Box>
			<NavigationBar />
			<VStack spacing={5}>
				<AftermathMap />
			</VStack>
		</Box>
	);
};
export default HomePage;
