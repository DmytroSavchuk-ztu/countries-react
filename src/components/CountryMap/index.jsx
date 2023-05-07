import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import "./CountryMap.css"

const CountryMap = ({chosenCountry}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD8RJzMGJ7GW5oM61xmcChnZGbenHFJ-Ik',
  });

  const defaultCenter = {
    lat: chosenCountry.capitalInfo.latlng[0],
    lng: chosenCountry.capitalInfo.latlng[1]
  };

  return (
      <div className='map_container'>
        {isLoaded && <GoogleMap
        mapContainerClassName = "map"
        zoom={6}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>}
      </div>

  );
};

export default CountryMap;
