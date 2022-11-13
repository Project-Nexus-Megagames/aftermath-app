import React from 'react';
import { Flex, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { poiMarkerTypes } from '../../system/enums';

interface NavProps {
	handleFilter: (arg0: string[]) => void;
}

const TopNav: React.FC<NavProps> = ({ handleFilter }) => {
	const poiMarkerValues = poiMarkerTypes.map((el) => el.value);
	return (
		<Flex className='navbarheader' position='fixed' top='0' left='40px' w='100%' h='40px'>
			{/*@ts-ignore*/}
			<CheckboxGroup onChange={(value) => handleFilter(value)} defaultValue={poiMarkerValues}>
				<Stack direction='row' marginLeft='20px'>
					{poiMarkerTypes.map((type, index) => (
						<Checkbox value={type.value} key={index}>
							{type.text}
						</Checkbox>
					))}
				</Stack>
			</CheckboxGroup>
		</Flex>
	);
};
export default TopNav;
