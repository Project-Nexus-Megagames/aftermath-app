import * as React from 'react';
import { Flex, Stack, IconButton, Link, VStack } from '@chakra-ui/react';
import { FaHome, FaUsersCog } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

export const ControlContext = () => (
	<Flex minH='100vh' className='sidebar' w='56px'></Flex>
);
