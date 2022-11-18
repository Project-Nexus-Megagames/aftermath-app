import * as React from 'react';
import { Flex, Stack, IconButton, Link, VStack } from '@chakra-ui/react';
import { FaHome, FaUsersCog } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export const SideBar = () => (
	<Flex minH='100vh' className='sidebar' w='56px'>
		<Stack>
			<VStack>
				<Link as={RouterLink} to='/home'>
					<IconButton aria-label='Home' icon={<FaHome />} />
				</Link>
				<Link as={RouterLink} to='/teamadmin'>
					<IconButton aria-label='TeamAdmin' icon={<FaUsersCog />} />
				</Link>
			</VStack>
		</Stack>
	</Flex>
);
