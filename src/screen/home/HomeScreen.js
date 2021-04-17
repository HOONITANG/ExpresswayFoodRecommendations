import React, {useState} from 'react'
import { Button, FlatList } from 'react-native'
import { Block, Text } from '../../common/elements';
import { connect } from 'react-redux';
import { addTodo } from '../../state/todo/todoActions';
import { RestLocations, Header } from './components';
import { NAVIGATION_FOODLIST, NAVIGATION_SEARCH } from '../../navigation/routes';
import useModal from '../hook/useModal';
import FilterModal from './components/FilterModal';


function HomeContainer({ navigation, addTodo }) {

    const { open, openModal, closeModal } = useModal();
    const [ placeholder , setPlaceholder ] = useState('고속도로 노선 검색')
    const [ list, setList ] = useState('고속도로를 검색해주세요.'); // 고속도로 데이터 - 고속도로 노선명을 사용하여 자바스크립트로 filter을 거쳐 저장함.
    const [ routeNo, setRouteNo ] = useState(''); 

    const navigationToFoodList = (params) => {
        navigation.navigate(NAVIGATION_FOODLIST, params)
    }

    const navigationToSearch = () => {
        navigation.navigate(NAVIGATION_SEARCH)
    }

    return (
        <Block safe flex white>
            <Header openModal={openModal} placeholder={placeholder} />
            <RestLocations onNavi={navigationToFoodList} list={list} routeNo={routeNo} addTodo={addTodo}/>
            <FilterModal closeModal={closeModal} open={open} setList={setList} setRouteNo={setRouteNo} setPlaceholder={setPlaceholder}/>
        </Block>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        todo: state.todo_list
    }
}

const mapDispatchToProps = { addTodo }

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
