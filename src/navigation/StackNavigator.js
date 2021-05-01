
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
    FoodListScreen,
    HomeScreen,
    SearchScreen
} from '../screen';

import {
    NAVIGATION_INIT,
    NAVIGATION_HOME,
    NAVIGATION_MAP,
    NAVIGATION_FOODLIST,
    NAVIGATION_SEARCH,
} from './routes';

import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
        initialRouteName={NAVIGATION_INIT}
        >
            <Stack.Screen 
                name={NAVIGATION_INIT}
                component={BottomTabNavigator}
                options={{ title: "휴고" }}
            />
            <Stack.Screen 
                name={NAVIGATION_FOODLIST}
                component={FoodListScreen}
                options={{ title: "음식 리스트"}}
            />
            <Stack.Screen 
                name={NAVIGATION_SEARCH}
                component={SearchScreen}
            />
            {/* <Stack.Screen 
                name={NAVIGATION_HOME} 
                component={HomeScreen} 
            /> */}
            
        </Stack.Navigator>
    )
};

export default StackNavigator;