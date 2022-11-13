import * as React from 'react';
import { Flex, Stack, IconButton } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';

export const SideBar = () => (
	<Flex minH='100vh' className='sidebar' w='56px'>
		<Stack>
			<IconButton aria-label='Home' icon={<FiHome />} />
		</Stack>
	</Flex>
);
