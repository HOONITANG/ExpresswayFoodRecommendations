import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

function MapViewWrap ({ data, mapRef, children }) {
    
    return (
        <MapView
            ref={mapRef}  
            //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={{
                latitude:  parseFloat(data[0].yValue),
                longitude:  parseFloat(data[0].xValue),
                // 얼마의 위도경도 차이까지 지도에 표시되는가 크면 클수록 지도 화면의 높이가 높아짐.
                latitudeDelta: 0.15,
                longitudeDelta: 0.21,
            }}
            style={{flex: 1}}
        >
            <>
                { children}
            </>
        </MapView>
    )
}

export default MapViewWrap;