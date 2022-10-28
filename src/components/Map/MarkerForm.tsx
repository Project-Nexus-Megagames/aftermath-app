import React, { useEffect } from 'react';
import { Button, FormControl, FormLabel, Input, Stack, HStack, Textarea } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
//import socket from '../../socket';
import { Poi, Location } from '../../config/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSocket } from '../../hooks/webSocketHook';

interface PoiFormProps {
	onSubmit: () => void;
	onCancel: () => void;
	poi?: Poi;
	location?: Location;
}

type FormValues = {
	location: { lat: number; lng: number };
	title: string;
	type: string;
	body?: string;
	_id?: string;
};

export const MarkerForm: React.FC<PoiFormProps> = ({ onSubmit, onCancel, poi, location }) => {
	const { socket } = useSocket();
	const pois = useSelector((state: RootState) => state.pois.list);
	const defaultValues: FormValues = {
		location: location ? location : { lat: 0, lng: 0 },
		title: '',
		type: '',
		body: ''
	};

	const {
		register,
		control,
		handleSubmit: formSubmit,
		formState: { errors, isValid, dirtyFields }
	} = useForm<FormValues>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: !poi
			? defaultValues
			: {
					location: poi.location,
					_id: poi._id,
					title: poi.title,
					body: poi.body,
					type: poi.type
			  },

		criteriaMode: 'firstError',
		shouldFocusError: true,
		shouldUnregister: false,
		delayError: undefined
	});

	useEffect(() => {
		const handleContextmenu = (e: MouseEvent) => {
			e.preventDefault();
		};
		document.addEventListener('contextmenu', handleContextmenu);
		return function cleanup() {
			document.removeEventListener('contextmenu', handleContextmenu);
		};
	}, []);

	const handleSubmit: SubmitHandler<FormValues> = (data, e) => {
		e?.preventDefault();

		if (onSubmit instanceof Function) onSubmit();
		console.log(data);
		socket.emit('request', { route: 'poi', action: 'create', data });
	};

	const handleCancel = () => {
		if (onCancel instanceof Function) onCancel();
	};

	return (
		//<form onSubmit={formSubmit(handleSubmit)}>
		<form>
			<Stack>
				<FormControl isRequired>
					<HStack>
						<FormLabel m={0} htmlFor="title">
							Title
						</FormLabel>
					</HStack>
					<Input id="title" placeholder="title" {...register('title')} />
				</FormControl>
				<FormControl isRequired>
					<HStack>
						<FormLabel m={0} htmlFor="body">
							Body
						</FormLabel>
					</HStack>
					<Textarea isRequired id="body" resize={'vertical'} placeholder="Body" noOfLines={40} {...register('body')} />
				</FormControl>
				<DevTool control={control} placement="bottom-right" />
				<Button type="submit" colorScheme="green" disabled={!isValid} onClick={formSubmit(handleSubmit)}>{`Save as Draft`}</Button>
				<Button colorScheme="red" onClick={() => handleCancel()}>{`Cancel`}</Button>
			</Stack>
		</form>
	);
};
