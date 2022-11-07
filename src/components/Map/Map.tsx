import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { mapstyle } from '../../config/mapStyles';
import { Box, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Location } from '../../config/types';
import { Marker } from './Marker';
import { MapDrawer } from './MapDrawer';
import { Poi } from '../../config/types';
import { NewMarker } from './NewMarker';
import { useSocket } from '../../hooks/webSocketHook';
import { poiMarkerTypes } from '../../system/enums';

const MAPKEY = process.env.REACT_APP_MAPKEY || '';
const mapContainerStyle = {
	width: '100%',
	height: '100%'
};

export const AftermathMap = () => {
	const poiMarkerValues = poiMarkerTypes.map((el) => el.value);
	const pois = useSelector((state: RootState) => state.pois.list);
	const { connectSocket } = useSocket();
	const [activeMarker, setActiveMarker] = useState({ _id: '0', title: '', type: '', location: { lat: 0, lng: 0 } });
	const [markerModal, setMarkerModal] = useState(false);
	const [newMarkerModal, setNewMarkerModal] = useState(false);
	const [newLocation, setNewLocation] = useState({ lat: 0, lng: 0 });
	const [filter, setFilter] = useState(poiMarkerValues);
	const [poisToDisplay, setPoisToDisplay] = useState([]);

	useEffect(() => {
		//TODO this will need to go to the login section / callback function
		connectSocket();
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
				console.log(temp);
				filtered.push(...temp);
			});
			//@ts-ignore
			setPoisToDisplay(filtered);
			//@ts-ignore
		} else setPoisToDisplay([]);
	}, [filter, pois]);

	const handleActiveMarker = (marker: Poi) => {
		setActiveMarker(marker);
		setMarkerModal(true);
	};

	const handleAddPoi = (location: Location, e: google.maps.MapMouseEvent) => {
		e.domEvent.preventDefault();
		setNewMarkerModal(true);
		setNewLocation(location);
	};

	const handleFilter = (filterValue: string[]) => {
		console.log(filterValue);
		// @ts-ignore
		setFilter(filterValue);
	};

	const mapOptions = {
		styles: mapstyle,
		disableDefaultUI: true,
		zoomControl: true,
		mapTypeControl: true,
		// restriction: {
		//   latLngBounds: {
		//     north: 50,
		//     south: -50,
		//     east: 1600,
		//     west: 1000,
		//   },
		// },
		minZoom: 0,
		maxZoom: 20,
		mapTypeId: 'terrain'
	};
	const center = {
		lat: 40.712776,
		lng: -74.005974
	};

	return (
		<Box bg='blue' h='100vh' w='100%'>
			<Box bg='black' h='32px' w='100%'>
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
			</Box>
			<LoadScript googleMapsApiKey={MAPKEY}>
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					options={mapOptions}
					center={center}
					zoom={10}
					onRightClick={(e) => {
						handleAddPoi(e.latLng!.toJSON(), e);
						e.domEvent.preventDefault();
					}}
				>
					{poisToDisplay.map((poi) => (
						//@ts-ignore
						<Marker key={poi._id} poi={poi} onClick={() => handleActiveMarker(poi)} />
					))}
				</GoogleMap>
			</LoadScript>
			<MapDrawer isOpen={markerModal} poi={activeMarker} closeDrawer={() => setMarkerModal(false)} />
			<NewMarker isOpen={newMarkerModal} newLocation={newLocation} closeDrawer={() => setNewMarkerModal(false)} />
		</Box>
	);
};
