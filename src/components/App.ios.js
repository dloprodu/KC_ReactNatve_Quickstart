import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { Houses, Characters } from './sections';
import * as api from '../api';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../redux';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        api.configureAxios();
        StatusBar.setBarStyle('light-content');
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Stack key="root">
                        <Scene key="houses" component={Houses} title="Casas" hideNavBar={true} initial={true}></Scene>
                        <Scene key="characters" component={Characters} title="Personajes"></Scene>
                    </Stack>
                </Router>
            </Provider>
        )
    }
}