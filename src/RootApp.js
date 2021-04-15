
import 'react-native-gesture-handler';
import React, { Component } from 'react'
import configureStore from './state/configureStore';
import { Provider } from 'react-redux';
import App from './App';
import RootNavigator from './navigation';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default class RootApp extends Component {
    render() {
        return (
            <Provider store={configureStore}>
                <QueryClientProvider client={queryClient} >
                    <RootNavigator/>
                </QueryClientProvider>
            </Provider>
        )
    }
}
