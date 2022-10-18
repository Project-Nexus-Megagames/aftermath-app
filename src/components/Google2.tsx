import React, { useRef, useCallback, useEffect } from 'react'
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { mapstyle } from '../config/mapStyles';
import { Box, Button, Spinner, Text } from '@chakra-ui/react';

const MAPKEY = 'AIzaSyA_d1zJREiLhBphyJNWTQutlZ0yqWpgO3Q'
const libraries = ['places'];
const mapContainerStyle = {
	width: '100%',
	height: '100%',
};

export const AftermathMap2 = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAPKEY // ,
    // ...otherOptions
  })
  

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
    //mapTypeId: 'terrain'
  }
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const onLoad = useCallback(
      // @ts-ignore
      function onLoad (mapInstance) {
        // do something with map Instance
      }
    , [])
    return <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={mapOptions}
      onLoad={onLoad}
      center={center}
      zoom={10}
    >
      {
        // ...Your map components
      }
    </GoogleMap>
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <Spinner />
}