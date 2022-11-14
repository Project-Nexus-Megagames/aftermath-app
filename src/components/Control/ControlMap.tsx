import React, { useState, useEffect } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Poi } from '../../config/types';
import { poiMarkerTypes } from '../../system/enums';
import { AftermathMap } from '../Map/AftermathMap';
import TopNav from '../Map/TopNav';

export const ControlMap = () => {
	const poiMarkerValues = poiMarkerTypes.map((el) => el.value);
	const pois = useSelector((state: RootState) => state.pois.list);
	const [filter, setFilter] = useState(poiMarkerValues);
	const [poisToDisplay, setPoisToDisplay] = useState(pois);

	useEffect(() => {
		//TODO this will need to go to the login section / callback function
		//connectSocket();
		const handleContextmenu = (e: MouseEvent) => {
			e.preventDefault();
		};
		document.addEventListener('contextmenu', handleContextmenu);
		return function cleanup() {
			document.removeEventListener('contextmenu', handleContextmenu);
		};
	}, []);

	useEffect(() => {
		const filtered: Poi[] = [];
		let temp: Poi[] = [];
		if (filter.length !== 0) {
			filter.map((fil) => {
				temp = pois.filter((el) => el.type === fil);
				return filtered.push(...temp);
			});
			setPoisToDisplay(filtered);
		} else setPoisToDisplay([]);
	}, [filter, pois]);

	const handleFilter = (filterValue: string[]) => {
		setFilter(filterValue);
	};

	return (
		<React.Fragment>
			<VStack>
				<TopNav handleFilter={handleFilter} />
			</VStack>
			<AftermathMap pois={poisToDisplay} />
		</React.Fragment>
	);
};
