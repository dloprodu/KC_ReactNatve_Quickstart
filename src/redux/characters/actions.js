import * as types from './types';
import { Actions } from 'react-native-router-flux';

export function setFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value
    };
}

export function setList(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value
    };
}

export function setItem(value) {
    return {
        type: types.CHARACTERS_SET_ITEM,
        value
    };
}

export function fetchHouseCharacters() {
    return (dispatch, getState, api) => {
        console.log(getState().houses)
        const house = getState().houses.item;

        if (!house) {
            return;
        }

        dispatch( setList([]) );
        dispatch( setFetching(true) );

        api
            .fetchCharacters(house.id)
            .then( res => {
                dispatch( setFetching(false) );
                if (!res || !res.data || !res.data.records) {
                    return;
                }

                dispatch( setList( res.data.records ) );
            })
            .catch( err => {
                dispatch( setFetching(false) );
                console.log('fetchCharacters error: ', err);
            });
    };
}

export function postHouseCharacter(data) {
    return (dispatch, getState, api) => {
        if (!data) {
            return;
        }

        const house = getState().houses.item;

        if (!house) {
            return;
        }

        const characterData = {
            ...data,
            casa: house.id
        };

        dispatch( setFetching(true) );

        api
            .postHouseCharacter(characterData)
            .then( res => {
                dispatch( setFetching(false) );
   
                dispatch( fetchHouseCharacters() );

                Actions.pop();
            })
            .catch( err => {
                dispatch( setFetching(false) );
                console.log('fetchCharacters error: ', err);
            });
    };
}