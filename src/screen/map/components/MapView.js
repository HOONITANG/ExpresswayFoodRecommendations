import React, { useEffect, useRef, useState }  from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Block, Icon, Text } from '../../../common/elements'
import Markers from './Markers';
import MyMarker from './MyMarker';
import useLocation from '../../hook/useLocation';

function MapViewWrap ({ data, onMarkerPress, routeNo }) {
    const { myLocation, setLocation, requestPermission, receiveLocation } = useLocation();
    const [ gps, setGps ] = useState(0);
    const mapRef = React.useRef();

    useEffect(() => { 
        requestPermission().then(result => receiveLocation(result, setLocation, mapRef))
    }, [routeNo]);
    
    if(!myLocation) {
        <Block>
            <Text>위치 정보를 불러오고 있습니다.</Text>
        </Block>
    }

    return (
        <MapView
            ref={mapRef}  
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            // region={{
            //     // 내위치로..
            //     latitude:  parseFloat(data[0].yValue),
            //     longitude:  parseFloat(data[0].xValue),
            //     // 얼마의 위도경도 차이까지 지도에 표시되는가 크면 클수록 지도 화면의 높이가 높아짐.
            //     latitudeDelta: 0.15,
            //     longitudeDelta: 0.21,
            // }}
            style={{flex: 1}}
        >
            <MyMarker myLocation={myLocation}/>
            <Markers data={data} onMarkerPress={onMarkerPress} myLocation={myLocation} />
        </MapView>
    )
}

export default MapViewWrap;