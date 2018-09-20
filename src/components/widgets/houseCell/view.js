import React, { PureComponent } from 'react'
import { TouchableOpacity, Text } from 'react-native'

import style from './style';

export default class HouseCell extends PureComponent {
    static defaultProps = {
        house: null,
        selected: null,
        onPress: () => {},
        backgroundColor: 'green',
        selectedBackgroundColor: 'lime'
    }

    render() {
        const { house, selected } = this.props;
        const name = house && house.nombre || 'Sin nombre';
        const isSelected = selected && selected.id === house.id;
        const backgroundColor = isSelected 
            ? { backgroundColor: this.props.selectedBackgroundColor, borderColor: 'orange' }
            : { backgroundColor: this.props.backgroundColor };

        return (
            <TouchableOpacity 
                onPress={() => this.props.onPress(house)} 
                style={[
                    style.cellContainer, 
                    backgroundColor
                ]}>
                <Text style={{with: '100%'}}>{name}</Text>
            </TouchableOpacity>
        )
    }
}