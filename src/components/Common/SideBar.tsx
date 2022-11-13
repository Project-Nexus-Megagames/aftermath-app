import * as React from 'react';
import { Flex, Stack, Text, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FiBarChart2, FiCamera, FiFilm, FiHome, FiInstagram, FiLinkedin, FiMic, FiMusic, FiTwitter } from 'react-icons/fi';

export const SideBar = () => (
	<Flex as='section' minH='100vh' bg='bg-canvas'>
		<Flex flex='1' bg='bg-surface' boxShadow={useColorModeValue('sm', 'sm-dark')} maxW={{ base: 'full', sm: 'xs' }} py={{ base: '6', sm: '8' }} px={{ base: '4', sm: '6' }}>
			<Stack justify='space-between' spacing='1' width='full'>
				<Stack spacing='8' shouldWrapChildren>
					<Stack spacing='1'>
						<IconButton aria-label='Home' icon={<FiHome />} />
						<IconButton aria-label='Writing' icon={<FiBarChart2 />} aria-current='page' />
					</Stack>
					<Stack>
						<Text fontSize='sm' color='subtle' fontWeight='medium'>
							Media
						</Text>
						<Stack spacing='1'>
							<IconButton aria-label='Movies' icon={<FiFilm />} />
							<IconButton aria-label='Pictures' icon={<FiCamera />} />
							<IconButton aria-label='Music' icon={<FiMusic />} />
							<IconButton aria-label='Podcasts' icon={<FiMic />} />
						</Stack>
					</Stack>
					<Stack>
						<Text fontSize='sm' color='subtle' fontWeight='medium'>
							Social
						</Text>
						<Stack spacing='1'>
							<IconButton aria-label='Twitter' icon={<FiTwitter />} />
							<IconButton aria-label='Instagram' icon={<FiInstagram />} />
							<IconButton aria-label='Linkedin' icon={<FiLinkedin />} />
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Flex>
	</Flex>
);
