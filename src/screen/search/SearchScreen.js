import React from 'react'
import { Button, FlatList } from 'react-native'
import { Block, Text } from '../../common/elements';
import { Header, SearchList } from './components';
import { NAVIGATION_FOODLIST, NAVIGATION_SEARCH } from '../../navigation/routes';

export default function SearchContainer({ navigation }) {

    const navigationToFoodList = (params) => {
        navigation.navigate(NAVIGATION_FOODLIST, params)
    }

    const navigationToSearch = () => {
        navigation.navigate(NAVIGATION_SEARCH)
    }

    return (
        <Block safe flex white>
            <Header />
            <SearchList />
        </Block>
    )
}
