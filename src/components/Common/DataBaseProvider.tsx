import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { loadIngredients } from '../store/ingredients';
//import { loadRecipes } from '../store/recipes';

interface DBProps {
  children?: React.ReactNode;
}

const DatabaseProvider = (props:DBProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(loadRecipes());
    //dispatch(loadIngredients());
  }, [dispatch]);

  return <>{props.children}</>;
};

export default DatabaseProvider;
