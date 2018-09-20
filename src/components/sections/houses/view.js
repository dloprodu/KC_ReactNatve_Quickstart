import React, { Component, PureComponent } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import * as api from '../../../api';

export default class Houses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            houseList: [],
            selected: null
        };
    }

    componentWillMount() {
        api.fecthHouses()
            .then(res => {
                if (!res || !res.data || !res.data.records) {
                    this.setState({ houseList: [] });
                }

                this.setState({ houseList: res.data.records });
            })
            .catch( err => { 
                console.log('fetchHouses error: ', err);
                this.setState({ houseList: [] });
            });
    }

    _onHouseTapped(house) {
        this.setState({selected: house});
        // Actions.characters();
    }

    _renderItem({ item, index }) {
        return (
            <HouseCell 
                house={item} 
                onPress={(house) => this._onHouseTapped(house)} 
                selected={this.state.selected}/>
            )
    }

    render() {
        return (
            <View style={styles.container}>
                {/*
                <Text style={{ color: 'blue', fontSize: 20 }}>CASAS</Text>
                <Button title={'Characters'} 
                        color={'black'} 
                        onPress={() => this.goToCharacters()} />
                */}
                <FlatList
                    data={this.state.houseList}
                    extraData={this.state}
                    renderItem={ value => this._renderItem(value) }
                    keyExtractor={ (item, i) => `cell${item.id}` }
                    />
            </View>
        )
    }
}

class HouseCell extends PureComponent {
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
                style={[{height: 120, borderWidth: 1, borderColor: 'blue', alignItems: 'center', justifyContent: 'center'}, backgroundColor]}>
                <Text style={{with: '100%'}}>{name}</Text>
            </TouchableOpacity>
        )
    }
}