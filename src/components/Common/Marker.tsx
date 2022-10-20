import React, { useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import { Poi, Location } from '../../config/types';
import { poiUpdated } from '../../redux/entities/pois';
import { useAppDispatch } from '../../hooks/typedStoreHooks';

interface Props {
	poi: Poi;
	onClick: () => void;
}

export const Marker: React.FC<Props> = ({ poi, onClick }) => {
	const dispatch = useAppDispatch();

	const getIcon = (type: string) => {
		if (type) {
			if (type === 'danger') return '';
			else return '';
		}
		return '';
	};

	const updateLocation = (poi: Poi, location: Location) => {
		const newPoi = { ...poi };
		newPoi.location = location;
		dispatch(poiUpdated(newPoi));
	};

	return (
		<MarkerF
			key={poi._id}
			position={{ lat: poi.location.lat, lng: poi.location.lng }}
			icon={getIcon(poi.type)}
			draggable={true}
			onDragEnd={(e) => updateLocation(poi, e.latLng!.toJSON())}
			onClick={() => onClick()}
			//clusterer={clusterer}
		></MarkerF>
	);
};
