import React, { Component } from 'react';
import { StatusBar, TouchableOpacity, Text } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { Houses, Characters, CharacterDetail, CharacterAdd } from './sections';
import * as api from '../api';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../redux';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

const sceneDefaultStules = {
    navigationBarStyle: { backgroundColor: 'rgb(24,24,24)' },
    backButtonTextStyle: { color: 'white'},
    backButtonTintColor: 'white',
    titleStyle: { color: 'white'}
}

const RightButton = props => (
    <TouchableOpacity style={{padding: 10}} onPress={() => { Actions.characterAdd() }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{'Añadir'}</Text>
    </TouchableOpacity>
)

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
                        <Scene key="houses"
                            component={Houses} 
                            title="Casas" 
                            navigationBarStyle={{ backgroundColor: 'rgb(24,24,24)' }} 
                            hideNavBar={true} initial={true}>
                        </Scene>
                        <Scene key="characters" 
                            component={Characters} 
                            renderRightButton={RightButton}
                            title="Personajes" 
                            {...sceneDefaultStules}>
                        </Scene>
                        <Scene key="characterDetail"
                            component={CharacterDetail}
                            title="Character"
                            {...sceneDefaultStules}
                            >
                        </Scene>
                        <Scene key="characterAdd"
                            component={CharacterAdd}
                            title="Añadir"
                            {...sceneDefaultStules}
                            >
                        </Scene>
                    </Stack>
                </Router>
            </Provider>
        )
    }
}