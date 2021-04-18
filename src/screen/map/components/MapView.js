import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Markers from './Markers';

function MapViewWrap ({ data, onMarkerPress }) {
    return (
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={{
                // 내위치로..
                latitude:  parseFloat(data[0].yValue),
                longitude:  parseFloat(data[0].xValue),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            style={{flex: 1}}
        >
            <Markers data={data} onMarkerPress={onMarkerPress}/>
        </MapView>
    )
}

export default MapViewWrap;