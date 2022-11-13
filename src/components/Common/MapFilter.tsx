import React from 'react';
import { Flex, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { poiMarkerTypes } from '../../system/enums';

interface NavProps {
	handleFilter: (arg0: string[]) => void;
}

const TopNav: React.FC<NavProps> = ({ handleFilter }) => {
	const poiMarkerValues = poiMarkerTypes.map((el) => el.value);
	return (
		<Flex className='header' position='fixed' top='0' left='88'>
			{/*@ts-ignore*/}
			<CheckboxGroup onChange={(value) => handleFilter(value)} defaultValue={poiMarkerValues}>
				<Stack direction='row'>
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
