import {types} from "../actions/lectorium_data";

const Status = {
    LOADING: "LOADING",
    LOADED: "LOADED",
    ERROR: "ERROR",
};

const DefaultState = {
    status: Status.LOADING,

    error: null,

    users: null,
    playlists: null,
    recordings: null,
};

function lectorium_data(state=DefaultState, action) {
    switch (action.type) {
        case types.LOADING:
            return {...DefaultState, status: Status.LOADING};
        case types.ERROR:
            return {...DefaultState, status: Status.ERROR, error: action.reason};
        case types.LOADED:
            return {...DefaultState, status: Status.LOADED, ...action.data};
        default:
            return state;
    }
}

export {lectorium_data, Status};