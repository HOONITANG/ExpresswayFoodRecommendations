import React, {useState} from 'react'
import { Alert, Button, FlatList } from 'react-native'
import { Block, Text } from '../../common/elements';
import { connect } from 'react-redux';
import { addTodo, addParam } from '../../state/todo/todoActions';
import { RestLocations, Header } from './components';
import { NAVIGATION_FOODLIST, NAVIGATION_SEARCH } from '../../navigation/routes';
import useModal from '../hook/useModal';
import FilterModal from '../components/FilterModal';

function HomeContainer({ navigation, addTodo, addParam, placeholder, routeNo }) {

    const { open, openModal, closeModal } = useModal();

    const navigationToFoodList = (params) => {
        navigation.navigate(NAVIGATION_FOODLIST, params)
    }

    return (
        <Block safe flex white>
            <Header openModal={openModal} placeholder={placeholder} />
            <RestLocations onNavi={navigationToFoodList} routeNo={routeNo} addTodo={addTodo}/>
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
