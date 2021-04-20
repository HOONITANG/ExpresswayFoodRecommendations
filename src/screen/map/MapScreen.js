import React, { useState, useEffect } from 'react';
import { Block, Text } from '../../common/elements';
import { useRestArea } from '../../api/apiHandler';
import useModal from '../hook/useModal';
import useLocation from '../hook/useLocation';
import { FilterModal, GpsButton, Header, MapView, MyMarker, Markers } from './components';
import { NAVIGATION_FOODLIST, NAVIGATION_SEARCH } from '../../navigation/routes';


function MapScreen ({ navigation }) {
    const { open, openModal, closeModal } = useModal();
    const { myLocation, setLocation, requestPermission, receiveLocation, moveLocation } = useLocation();
    const [ placeholder , setPlaceholder ] = useState('경부선')
    const [ routeNo, setRouteNo ] = useState('0010'); 
    const { status, data } = useRestArea(routeNo);
    const mapRef = React.useRef();

    const navigationToFoodList = (params) => {
        navigation.navigate(NAVIGATION_FOODLIST, params)
    }

    const onMarkerPress = (stdRestCd) => {
        navigationToFoodList(stdRestCd)
    }

    const handleGpsClick = () => {
        moveLocation(setLocation, mapRef);
    }

    useEffect(() => { 
        requestPermission().then(result => receiveLocation(result, setLocation))
    }, [routeNo]);

    if ( status == "loading" ) return <Text>Loading...</Text>;
    if ( status == "error" ) return <Text>Error :(</Text>;

    if(!myLocation) {
        <Block>
            <Text>위치 정보를 불러오고 있습니다.</Text>
        </Block>
    }
    
    return (
        <Block flex>
            <Header openModal={openModal} placeholder={placeholder} />
            <MapView data={data} mapRef={mapRef} myLocation={myLocation} >
                <MyMarker myLocation={myLocation} mapRef={mapRef}/>
                <Markers data={data} onMarkerPress={onMarkerPress} myLocation={myLocation} />
            </MapView>
            <GpsButton handleGpsClick={handleGpsClick}/>
            <FilterModal closeModal={closeModal} open={open} setRouteNo={setRouteNo} setPlaceholder={setPlaceholder}/>
        </Block>
    )
}

export default MapScreen;