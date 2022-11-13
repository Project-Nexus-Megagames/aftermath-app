import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Poi } from '../../config/types';

import { poiMarkerTypes } from '../../system/enums';
import { AftermathMap } from '../Map/AftermathMap';
import '../../styles/navbar.scss';
import TopNav from '../Common/MapFilter';

export const ControlMap = () => {
	const poiMarkerValues = poiMarkerTypes.map((el) => el.value);
	const pois = useSelector((state: RootState) => state.pois.list);
	const [filter, setFilter] = useState(poiMarkerValues);
	const [poisToDisplay, setPoisToDisplay] = useState([]);

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
				filtered.push(...temp);
			});
			//@ts-ignore
			setPoisToDisplay(filtered);
			//@ts-ignore
		} else setPoisToDisplay([]);
	}, [filter, pois]);

	const handleFilter = (filterValue: string[]) => {
		console.log(filterValue);
		// @ts-ignore
		setFilter(filterValue);
	};

	return (
		<React.Fragment>
			<TopNav handleFilter={handleFilter} />
			<Flex as='main' w='100%' marginTop='100px'>
				<AftermathMap pois={poisToDisplay} />
			</Flex>
		</React.Fragment>
	);
};
