import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

export default class Characters extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 20}}>PERSONAJES</Text>
            </View>
        )
    }
}