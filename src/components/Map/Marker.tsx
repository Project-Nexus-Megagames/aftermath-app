import React from 'react';
import { MarkerF } from '@react-google-maps/api';
import { Poi, Location } from '../../config/types';
import { useSocket } from '../../hooks/webSocketHook';

interface Props {
	poi: Poi;
	onClick: () => void;
}

export const Marker: React.FC<Props> = ({ poi, onClick }) => {
	const { socket } = useSocket();

	const updateLocation = (poi: Poi, location: Location) => {
		const newPoi = { ...poi };
		newPoi.location = location;
		socket.emit('request', { route: 'poi', action: 'update', data: newPoi });
	};

	return (
		<MarkerF
			key={poi._id}
			position={{ lat: poi.location.lat, lng: poi.location.lng }}
			label={{ text: 'test', className: 'labelTest' }}
			icon={{ url: `/icons/${poi.type}.svg`, scaledSize: new google.maps.Size(24, 24) }}
			draggable={true}
			onDragEnd={(e) => updateLocation(poi, e.latLng!.toJSON())}
			onClick={() => onClick()}
			//clusterer={clusterer}
		></MarkerF>
	);
};
