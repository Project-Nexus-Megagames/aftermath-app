import React from 'react';

import { VStack, Box, Text } from '@chakra-ui/react';

const NavigationBar = () => {
	return (
		<React.Fragment>
			<Box h='56px'>
				<VStack spacing={5} align='left'>
					<Text>Home</Text>
				</VStack>
			</Box>
		</React.Fragment>
	);
};
export default NavigationBar;
