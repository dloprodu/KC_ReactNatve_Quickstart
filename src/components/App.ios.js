import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { Houses, Characters } from './sections';

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        
        this.state = {
            backgroundColor: 'blue',
            height: 80
        };
    }

    componentWillMount() {
        //this.setState({ backgroundColor: 'lime', title: 'Valor cambiado en componentWillMount' })
    }

    componentDidMount() {
        setTimeout( () => {
            this.setState({
                backgroundColor: 'red',
                title: 'Valor cambiado en componentDidMount'
            })
        }, 5000)
    }

    render() {
        return (
            <Router>
                <Stack key="root">
                    <Scene key="houses" component={Houses} title="Casas" initial={true}></Scene>
                    <Scene key="characters" component={Characters} title="Personajes"></Scene>
                </Stack>
            </Router>
        )
    }

    // render() {
    //     return (
    //         <View style={{backgroundColor: 'red', flex: 1}}>
    //             <View style={{backgroundColor: this.state.backgroundColor, height: this.state.height}}></View>
    //             <View style={{backgroundColor: 'yellow', flex: 1}}></View>
    //             <View style={{backgroundColor: 'green', height: 60 }}></View>
    //         </View>
    //     )
    // }
}