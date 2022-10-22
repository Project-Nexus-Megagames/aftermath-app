import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { mapstyle } from '../../config/mapStyles';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Location } from '../../config/types';
import { Marker } from './Marker';
import { MapDrawer } from './MapDrawer';
import { Poi } from '../../config/types';
import { NewMarker } from './NewMarker';

const MAPKEY = process.env.REACT_APP_MAPKEY || '';
const mapContainerStyle = {
	width: '100%',
	height: '100%'
};

export const AftermathMap = () => {
	const pois = useSelector((state: RootState) => state.pois.list);
	const [activeMarker, setActiveMarker] = useState({ _id: '0', title: '', type: '', location: { lat: 0, lng: 0 } });
	const [markerModal, setMarkerModal] = useState(false);
	const [newMarkerModal, setNewMarkerModal] = useState(false);
	const [newLocation, setNewLocation] = useState({ lat: 0, lng: 0 });

	useEffect(() => {
		const handleContextmenu = (e: MouseEvent) => {
			e.preventDefault();
		};
		document.addEventListener('contextmenu', handleContextmenu);
		return function cleanup() {
			document.removeEventListener('contextmenu', handleContextmenu);
		};
	}, []);

	const handleActiveMarker = (marker: Poi) => {
		setActiveMarker(marker);
		setMarkerModal(true);
	};

	const handleAddPoi = (location: Location, e: google.maps.MapMouseEvent) => {
		e.domEvent.preventDefault();
		const newPoi = {
			_id: (pois.length + 1).toString(),
			location: { lat: location.lat, lng: location.lng }
		};
		setNewMarkerModal(true);
		setNewLocation(location);
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
		<Box bg="blue" h="100vh" w="100%">
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
					{pois.map((poi) => (
						<Marker key={poi._id} poi={poi} onClick={() => handleActiveMarker(poi)} />
					))}
				</GoogleMap>
			</LoadScript>
			<MapDrawer isOpen={markerModal} poi={activeMarker} closeDrawer={() => setMarkerModal(false)} />
			<NewMarker isOpen={newMarkerModal} newLocation={newLocation} closeDrawer={() => setNewMarkerModal(false)} />
		</Box>
	);
};
