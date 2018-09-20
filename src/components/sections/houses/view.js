import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
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
    }

    _renderItem({ item, index }) {
        return (
            <HouseCell 
                house={item} 
                onPress={(house) => this._onHouseTapped(house)} 
                />
            )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.list}
                    numColumns={2}
                    // extraData={this.state}
                    renderItem={ value => this._renderItem(value) }
                    keyExtractor={ (item, i) => `cell${item.id}` }
                    style={{paddingTop: 30}}
                    />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.houses.isFetching,
        list: state.houses.list
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchHousesList: () => {
            dispatch(HousesActions.fetchHousesList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Houses)