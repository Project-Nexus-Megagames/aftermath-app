import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { mapstyle } from '../../config/mapStyles';
import { Box, useDisclosure, Center } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Location } from '../../config/types';
import { useAppDispatch } from '../../hooks/typedStoreHooks';
import { poiAdded } from '../../redux/entities/pois';
import { Marker } from './Marker';
import { MapDrawer } from './MapDrawer';
import { Poi } from '../../config/types';

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
	const [activeMarker, setActiveMarker] = useState({ _id: '0', title: '', type: '', location: { lat: 0, lng: 0 } });
	const [articleModal, setArticleModal] = useState(false);

	const handleActiveMarker = (marker: Poi) => {
		setActiveMarker(marker);
		setArticleModal(true);
	};

	const handleAddPoi = (location: Location) => {
		console.log(location);
		const newPoi = {
			_id: (pois.length + 1).toString(),
			location: { lat: location.lat, lng: location.lng }
		};
		dispatch(poiAdded(newPoi));
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
				<GoogleMap mapContainerStyle={mapContainerStyle} options={mapOptions} center={center} zoom={10} onRightClick={(e) => handleAddPoi(e.latLng!.toJSON())}>
					{/*<MarkerClusterer>
						{/*@ts-ignore*/}
					{/*{(clusterer) => {*/}
					{pois.map((poi) => (
						<Marker
							key={poi._id}
							poi={poi}
							onClick={() => handleActiveMarker(poi)}
							//clusterer={clusterer}
						/>
					))}

					{/*}
					</MarkerClusterer>*/}
				</GoogleMap>
			</LoadScript>
			<MapDrawer isOpen={articleModal} poi={activeMarker} closeDrawer={() => setArticleModal(false)} />
		</Box>
	);
};
