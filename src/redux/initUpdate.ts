import { socket } from '../system/socket';
import store from './store';
import { poiAdded, poiDeleted, poiUpdated } from './entities/pois';

const initUpdates = () => {
	socket.on('updateClients', (data) => {
		console.log('updateClients');
		for (const el of data) {
			switch (el.model) {
				case 'Poi':
					store.dispatch(poiUpdated(el));
					break;
				default:
					console.log(`Unable to update Redux for ${el.model}: ${el._id}`);
					break;
			}
		}
	});

	socket.on('createClients', (data) => {
		console.log('createClients');
		for (const el of data) {
			switch (el.model) {
				case 'Poi':
					store.dispatch(poiAdded(el));
					break;
				default:
					console.log(`Unable to add Redux for ${el.model}: ${el._id}`);
					break;
			}
		}
	});

	socket.on('deleteClients', (data) => {
		console.log('deleteClients');
		for (const el of data) {
			switch (el.model) {
				case 'Poi':
					store.dispatch(poiDeleted(el));
					break;
				default:
					console.log(`Unable to add Redux for ${el.model}: ${el.id}`);
					break;
			}
		}
	});

	socket.on('errorUnload', (data) => {
		console.log('errorUnload');
	});
};

export default initUpdates;
