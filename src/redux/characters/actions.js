import * as types from './types';

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