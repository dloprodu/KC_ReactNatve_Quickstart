import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

export default class Houses extends Component {

    constructor(props) {
        super(props);
    }

    goToCharacters() {
        Actions.characters();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white', fontSize: 20 }}>CASAS</Text>
                <Button title={'Characters'} 
                        color={'black'} 
                        onPress={() => this.goToCharacters()} />
            </View>
        )
    }
}