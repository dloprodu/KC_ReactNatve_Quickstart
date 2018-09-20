import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'

import style from './style';

export default class HouseCell extends Component {
    static defaultProps = {
        house: null,
        onPress: () => {},
    }

    render() {
        const { house, selected } = this.props;

        return (
            <TouchableOpacity 
                activeOpacity={0.3}
                onPress={() => this.props.onPress(house)} 
                style={[
                    style.cellContainer
                ]}>
                <Image 
                    source={{ uri: house.image_dir }} 
                    style={{ width: '100%', height: '100%' }}
                    esizeMode={'cover'}
                     />
            </TouchableOpacity>
        )
    }
}