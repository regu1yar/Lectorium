import {combineReducers} from "redux";

const SET_USERS = "users/set";

/*
{
    byId: {
        1: {id: 1, name: "aaa"},
        2: {id: 2, name: "bbb"},
        ...
    },
    allIds: [1, 2, ...],
}
*/
function users(state={byId: {}, allIds: []}, action) {
    switch (action.type) {
        case SET_USERS:
            return action.users;
        default:
            return state;
    }
}

const SET_PLAYLISTS = "playlists/set";

/*
{
    byId: {
        1: {id: 1, name: "aaa"},
        2: {id: 2, name: "bbb"},
        ...
    },
    allIds: [1, 2, ...],
}
*/
function playlists(state={byId: {}, allIds: []}, action) {
    switch (action.type) {
        case SET_PLAYLISTS:
            return action.playlists;
        default:
            return state;
    }
}

const SET_RECORDINGS= "recordings/set";

/*
{
    byId: {
        1: {id: 1, name: "aaa", playlist_id: 123, time: ..., ...},
        ...
    },
    allIds: [1, ...],
}
*/
function recordings(state={byId: {}, allIds: []}, action) {
    switch (action.type) {
        case SET_RECORDINGS:
            return action.recordings;
        default:
            return state;
    }
}


const lectorium = combineReducers({users, recordings, playlists});


export {SET_USERS, SET_PLAYLISTS, SET_RECORDINGS, lectorium};