import React, {useState, useEffect} from 'react'
import { Alert, Button, FlatList, Platform } from 'react-native'
import { Block, Text } from '../../common/elements';
import { connect } from 'react-redux';
import { addTodo, addParam } from '../../state/todo/todoActions';
import { RestLocations, Header, Tab, GasList } from './components';
import { NAVIGATION_FOODLIST, NAVIGATION_GAS } from '../../navigation/routes';
import useModal from '../hook/useModal';
import FilterModal from '../components/FilterModal';
import Banner from '../Banner';

function HomeContainer({ navigation, addTodo, addParam, placeholder, routeNo }) {

    const { open, openModal, closeModal } = useModal();
    const [tabIndex, setTabIndex] = useState(0);
    const tabArr = ['휴게소', '주유소'];

    const navigationToFoodList = (params) => {
        navigation.navigate(NAVIGATION_FOODLIST, params)
    }

    return (
        <Block safe flex white>
            <Banner/>
            <Header openModal={openModal} placeholder={placeholder}  />
            <Tab tabArr={tabArr} tabIndex={tabIndex} setTabIndex={setTabIndex}/>
            {tabIndex == 0 && <RestLocations onNavi={navigationToFoodList} routeNo={routeNo} addTodo={addTodo}/>}
            {tabIndex == 1 && <GasList routeNo={routeNo} addTodo={addTodo} />}
            <FilterModal closeModal={closeModal} open={open} addParam={addParam}/>
        </Block>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { todos } = state;
    return {
        routeNo: todos.routeNo,
        placeholder: todos.placeholder,
    }
}

const mapDispatchToProps = { addTodo, addParam }

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
