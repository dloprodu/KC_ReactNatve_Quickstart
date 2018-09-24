import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { HouseCell } from '../../widgets';

import { connect } from 'react-redux';
import * as HousesActions from '../../../redux/houses/actions';

export class Houses extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchHousesList();
    }

    _onHouseTapped(house) {
        // this.setState({selected: house});
        // Actions.characters();
        this.props.onHouseTapped(house);
    }

    _renderItem({ item, index }) {
        return (
            <HouseCell 
                house={item} 
                onPress={(house) => this._onHouseTapped(house)} 
                />
            )
    }

    _renderActivityIndicator() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}>
                <ActivityIndicator color={"white"} animating={this.props.isFetching}  />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>

                { this._renderActivityIndicator() }

                <FlatList
                    data={this.props.list}
                    numColumns={2}
                    // extraData={this.state}
                    renderItem={ value => this._renderItem(value) }
                    keyExtractor={ (item, i) => `cell${item.id}` }
                    style={{paddingTop: 40}}
                    />
            </View>
        )
    }
}

// nos subscribimos a los cambios de valor de estas valores
const mapStateToProps = (state) => {
    return {
        isFetching: state.houses.isFetching,
        list: state.houses.list,
        house: state.houses.item
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHousesList: () => {
            dispatch( HousesActions.fetchHousesList() )
        },
        onHouseTapped: (house) => {
            dispatch( HousesActions.setItem(house) );
            Actions.characters();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Houses)