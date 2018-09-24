import * as types from './types';
import * as api from '../../api';

function setFetching(value) {
    return {
        type: types.HOUSES_SET_FETCHING,
        value: value
    };
}

export function setList(value) {
    return {
        type: types.HOUSES_UPDATE_LIST,
        value
    };
}

export function setItem(value) {
    return {
        type: types.HOUSES_SET_ITEM,
        value
    };
}

export function fetchHousesList() {
    return (dispatch, getState) => {
        console.log('getState: ', getState());

        dispatch( setFetching(true) );

        api
            .fecthHouses()
            .then( res => {
                dispatch( setFetching(false) );
                if (!res || !res.data || !res.data.records) {
                    dispatch( setList([]) );
                }

                dispatch( setList( res.data.records ) );
            })
            .catch( err => {
                dispatch( setFetching(false) );
                console.log('fetchHouses error: ', err);
            });
    };
}