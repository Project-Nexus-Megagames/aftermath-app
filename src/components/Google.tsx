import React, { useState } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF, MarkerClusterer } from '@react-google-maps/api';
import { mapstyle } from '../config/mapStyles';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Location } from '../config/types';
import { useAppDispatch } from '../hooks/typedStoreHooks';
import { poiUpdated } from '../redux/entities/pois';
import cluster from 'cluster';

const MAPKEY = process.env.REACT_APP_MAPKEY || '';
const libraries = ['places'];
const mapContainerStyle = {
	width: '100%',
	height: '100%'
};

export const AftermathMap = () => {
	const dispatch = useAppDispatch();
	/** useDisclosure hook for full hook version of persistance */
	const { isOpen: showInfo, onToggle: toggleInfo, onOpen: openInfo, onClose: closeInfo } = useDisclosure();
	const pois = useSelector((state: RootState) => state.pois.list);
	const [activeMarker, setActiveMarker] = useState('');

	const handleActiveMarker = (marker: string) => {
		if (marker === activeMarker) {
			return;
		}
		setActiveMarker(marker);
	};

	const updateLocation = (id: string, location: Location) => {
		if (id && location) {
			const poi = pois.find((el) => el._id === id);
			if (poi) {
				const newPoi = { ...poi };
				newPoi.location = location;
				dispatch(poiUpdated(newPoi));
			}
		}
	};

	const openWindow = (location: Location) => {
		if (location) {
			openInfo();
		}
	};
	//const clusterOptions = {
	//	imageExtension: 'png',
	//	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
	//};

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
				<GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} center={center} zoom={10}>
					<MarkerClusterer>
						{/*@ts-ignore*/}
						{(clusterer) => {
							pois.map((poi) => (
								<MarkerF
									key={poi._id}
									position={{ lat: poi.location.lat, lng: poi.location.lng }}
									icon={'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
									draggable={true}
									onDragEnd={(e) => updateLocation(poi._id, e.latLng!.toJSON())}
									onClick={() => handleActiveMarker(poi._id)}
									clusterer={clusterer}
								>
									{activeMarker === poi._id ? (
										<InfoWindowF onCloseClick={() => closeInfo()} zIndex={1000}>
											<Text>Info Window</Text>
										</InfoWindowF>
									) : null}
								</MarkerF>
							));
						}}
					</MarkerClusterer>
				</GoogleMap>
			</LoadScript>
		</Box>
	);
};

//Hide and show InfoWindow: https://codesandbox.io/s/react-google-mapsapi-multiple-markers-infowindow-h6vlq?file=/src/Map.js
