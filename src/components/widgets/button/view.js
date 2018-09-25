import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default class extends Component {
    static defaultProps = {
        label: 'Ok',
        onPress: () => {}
    }

    render() {
        return (
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.label}</Text>
            </TouchableOpacity>
        )
    }
}