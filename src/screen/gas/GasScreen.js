import React, {useState} from 'react'
import { Alert, Button, FlatList } from 'react-native'
import { Block, Text } from '../../common/elements';
import { connect } from 'react-redux';
import { addParam } from '../../state/todo/todoActions';
import {  Header  } from './components';
import { NAVIGATION_FOODLIST, NAVIGATION_SEARCH } from '../../navigation/routes';
import useModal from '../hook/useModal';
import FilterModal from '../components/FilterModal';

function GasContainer({ navigation, addParam, placeholder, routeNo }) {

    const { open, openModal, closeModal } = useModal();


    return (
        <Block safe flex white>
            <Header openModal={openModal} placeholder={placeholder} />
            <FilterModal closeModal={closeModal} open={open} addParam={addParam}/>
        </Block>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        routeNo: state.routeNo,
        placeholder: state.placeholder,
    }
}

const mapDispatchToProps = { addParam }

export default connect(mapStateToProps, mapDispatchToProps)(GasContainer)
