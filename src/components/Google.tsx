import React, { useRef, useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { mapstyle } from '../config/mapStyles';
import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import { MarkerF } from '@react-google-maps/api';

const MAPKEY = process.env.REACT_APP_MAPKEY || '';
const libraries = ['places'];
const mapContainerStyle = {
	width: '100%',
	height: '100%'
};

export const AftermathMap = () => {
	const [location, setLocation] = useState({ lat: 40.712776, lng: -74.005974 });
	// @ts-ignore
	const newLocation = (location) => {
		setLocation(location);
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
		minZoom: 3,
		maxZoom: 9
		//mapTypeId: 'terrain'
	};
	const center = {
		lat: -3.745,
		lng: -38.523
	};

	return (
		<Box bg="blue" h="100vh" w="100%">
			<LoadScript googleMapsApiKey={MAPKEY}>
				<GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} center={center} zoom={10} onClick={(e) => newLocation(e.latLng!.toJSON())}>
					<MarkerF position={location} icon={'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'} />
				</GoogleMap>
			</LoadScript>
		</Box>
	);
};
