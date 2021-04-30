
import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { configureStore, persistor } from './state/configureStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import RootNavigator from './navigation';
import { QueryClient, QueryClientProvider } from "react-query";
import SplashScreen from 'react-native-splash-screen'
import { prefetchTodos } from './AysnSetup';

const queryClient = new QueryClient();
export default class RootApp extends Component {
    async componentDidMount () {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        await prefetchTodos('0010').then(() => {
            SplashScreen.hide();
        });
        
    }
    render() {
        return (
            <Provider store={configureStore}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient} >
                        <RootNavigator/>
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        )
    }
}
