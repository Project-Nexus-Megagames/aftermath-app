import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Icon, IconButton, } from '@chakra-ui/react';
import { SimpleGrid, Button, VStack, Flex, Spinner } from '@chakra-ui/react';
import { AftermathMap } from '../Google';

const HomePage = () => {

return (
	<VStack spacing={5}>
		{/* <Button>Hello</Button> */}
		<AftermathMap />
	</VStack>
)}
export default HomePage;