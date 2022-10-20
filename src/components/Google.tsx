import React, { useRef, useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import { mapstyle } from '../config/mapStyles';
import { Box, Button, Spinner, Text } from '@chakra-ui/react';

const MAPKEY = process.env.REACT_APP_MAPKEY || '';
const libraries = ['places'];
const mapContainerStyle = {
	width: '100%',
	height: '100%'
};

type Location =
	| {
			lat: number;
			lng: number;
	  }
	| undefined;

export const AftermathMap = () => {
	const [location, setLocation] = useState({ lat: 40.712776, lng: -74.005974 });
	const [showWindow, setShowWindow] = useState(false);

	const newLocation = (location: Location) => {
		if (location) setLocation(location);
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
		maxZoom: 9,
		mapTypeId: 'terrain'
	};
	const center = {
		lat: 40.712776,
		lng: -74.005974
	};

	return (
		<Box bg="blue" h="100vh" w="100%">
			<LoadScript googleMapsApiKey={MAPKEY}>
				<GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} center={center} zoom={10} onClick={(e) => newLocation(e.latLng?.toJSON())}>
					<MarkerF
						position={location}
						icon={'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
						draggable={true}
						onDragEnd={(e) => newLocation(e.latLng?.toJSON())}
					>
						<InfoWindow>
							<div>
								<h1>InfoWindow</h1>
							</div>
						</InfoWindow>
					</MarkerF>
				</GoogleMap>
			</LoadScript>
		</Box>
	);
};

//Hide and show InfoWindow: https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js
