import React, { Component, PureComponent } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import * as api from '../../../api';

export default class Houses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            houseList: []
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
        Actions.characters();
    }

    _renderItem({ item, index }) {
        return <HouseCell house={item} onPress={(house) => this._onHouseTapped(house)}/>
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
                    renderItem={ value => this._renderItem(value) }
                    keyExtractor={ (item, i) => `cell${item.id}` }
                    />
            </View>
        )
    }
}

class HouseCell extends PureComponent {
    static defaultsProps = {
        house: null,
        onPress: () => {}
    }

    render() {
        const { house } = this.props;
        const name = house && house.nombre || 'Sin nombre';

        return (
            <TouchableOpacity onPress={() => this.props.onPress(house)} style={{height: 120, borderWidth: 1, borderColor: 'blue', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{with: '100%'}}>{name}</Text>
            </TouchableOpacity>
        )
    }
}