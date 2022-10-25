//@ts-nocheck

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPois } from '../../redux/entities/pois';

interface DBProps {
	children?: React.ReactNode;
}

const DatabaseProvider = (props: DBProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadPois());
		//dispatch(loadIngredients());
	}, [dispatch]);

	return <>{props.children}</>;
};

export default DatabaseProvider;
