import React, { useState } from 'react';
import { Block, Text } from '../../common/elements';
import { useRestArea } from '../../api/apiHandler';
import useModal from '../hook/useModal';
import { FilterModal, Header, MapView } from './components';
import { NAVIGATION_FOODLIST, NAVIGATION_SEARCH } from '../../navigation/routes';

function MapScreen ({ navigation }) {
    const { open, openModal, closeModal } = useModal();

    const [ placeholder , setPlaceholder ] = useState('경부선')
    const [ routeNo, setRouteNo ] = useState('0010'); 
    const { status, data } = useRestArea(routeNo);

    const navigationToFoodList = (params) => {
        navigation.navigate(NAVIGATION_FOODLIST, params)
    }

    const onMarkerPress = (stdRestCd) => {
        navigationToFoodList(stdRestCd)
    }

    if ( status == "loading" ) return <Text>Loading...</Text>;
    if ( status == "error" ) return <Text>Error :(</Text>;
    
    return (
        <Block flex>
            <Header openModal={openModal} placeholder={placeholder} />
            <MapView data={data} onMarkerPress={onMarkerPress} routeNo={routeNo}/>
            <FilterModal closeModal={closeModal} open={open} setRouteNo={setRouteNo} setPlaceholder={setPlaceholder}/>
        </Block>
    )
}

export default MapScreen;