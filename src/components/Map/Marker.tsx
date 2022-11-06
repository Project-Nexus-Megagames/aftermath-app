import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import { Poi, Location } from '../../config/types';
import { useSocket } from '../../hooks/webSocketHook';
import loot from '../../assets/icons/loot.svg';
import danger from '../../assets/icons/danger.svg';
import info from '../../assets/icons/info.svg';

interface Props {
	poi: Poi;
	onClick: () => void;
}

export const Marker: React.FC<Props> = ({ poi, onClick }) => {
	const { socket } = useSocket();

	const getIcon = (type: string) => {
		if (type) {
			if (type === 'danger') return danger;
			if (type === 'loot') return loot;
			else return info;
		}
		return info;
	};

	const updateLocation = (poi: Poi, location: Location) => {
		const newPoi = { ...poi };
		newPoi.location = location;
		socket.emit('request', { route: 'poi', action: 'update', data: newPoi });
	};

	return (
		<MarkerF
			key={poi._id}
			position={{ lat: poi.location.lat, lng: poi.location.lng }}
			//icon={getIcon(poi.type)}
			icon={{ url: getIcon(poi.type), scaledSize: new google.maps.Size(24, 24) }}
			draggable={true}
			onDragEnd={(e) => updateLocation(poi, e.latLng!.toJSON())}
			onClick={() => onClick()}
			//clusterer={clusterer}
		></MarkerF>
	);
};
