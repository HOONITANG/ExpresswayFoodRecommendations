import React from 'react'
import { Text, View, Button } from 'react-native'
import { HomeScreen, TodoScreen, MapScreen, GasScreen } from '../screen';
import { NAVIGATION_HOME, NAVIGATION_TODO, NAVIGATION_MAP, } from './routes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#e91e63",
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: 'white' }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ tabBarLabel: '휴게소' }}
            />
            <Tab.Screen 
                name="Gas" 
                component={GasScreen} 
                options={{ tabBarLabel: '주유소' }}
            />
        </Tab.Navigator>
    )
}

export default TopTabNavigation;
