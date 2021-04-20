import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    HomeScreen,
    TodoScreen,
    MapScreen,
} from '../screen';
import {
    NAVIGATION_HOME,
    NAVIGATION_TODO,
    NAVIGATION_MAP,
} from './routes';
import TopTabNavigation from './TopTabNavigation';
import { Icon } from '../common/elements';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => { 
    return (
        <Tab.Navigator
            lazy
        >
            <Tab.Screen
                name={NAVIGATION_HOME}
                component={TopTabNavigation}
                options={{
                tabBarIcon: ({ color, focused }) => (
                        <Icon
                        type="ionicon"
                        name={focused ? 'home' : 'home-outline'}
                        color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={NAVIGATION_TODO}
                component={TodoScreen}
                options={{
                tabBarIcon: ({ color, focused }) => (
                        <Icon
                        type="fontisto"
                        name="favorite"
                        color={color}
                        />
                    ),
                }}
                // listeners={{
                //     tabPress: e => {
                //         if (false) {
                //             // Prevent default action
                //             // 탭 클릭 막고 아래 실행
                //             e.preventDefault();
                //             console.log("TODO TAB")
                //         }
                //     },
                // }}
            />
            <Tab.Screen
                name={NAVIGATION_MAP}
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Icon 
                            type="feather"
                            name="map"
                            color={ color }
                        />
                    )
                }}
            />
            
        </Tab.Navigator>
    );
};

// const mapStateToProps = ({ account, cart }) => {
//     const { loggedIn } = account;
//     const { cart: { items_qty: cartItemsCount } = {} } = cart;
//     return {
//       loggedIn,
//       cartItemsCount,
//     };
//   };
  
// export default connect(mapStateToProps)(BottomTabNavigator);

export default BottomTabNavigator;
