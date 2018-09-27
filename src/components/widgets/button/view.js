import React, { Component } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

export default class extends Component {
    static defaultProps = {
        label: 'Ok',
        onPress: () => {},
        isFetching: false
    }

    _onPress() {
        if (this.props.isFetching) {
            return;
        }

        this.props.onPress()
    }

    _renderContent() {
        if (this.props.isFetching) {
            return <ActivityIndicator color={'#FFF'} />
        } else {
            return <Text style={styles.buttonText}>{this.props.label}</Text>
        }
    }

    render() {
        return (
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => this._onPress()}>
                { this._renderContent() }
            </TouchableOpacity>
        )
    }
}