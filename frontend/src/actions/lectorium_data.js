import Axios from "axios";
import {api_url} from "../constants";
import Moment from "moment";
import {logout} from "./authentication";

const types = {
    LOADING: "LOADING",
    LOADED: "LOADED",
    ERROR: "ERROR",
};


const loading = {type: types.LOADING};
const loaded = (data) => ({type: types.LOADED, data});
const error = (reason) => ({type: types.ERROR, reason});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function withIndex(objects) {
    return {
        all: objects,
        byId: Object.fromEntries(objects.map(obj => [obj.id, obj])),
        allIds: objects.map(obj => obj.id),
    }
}

async function _fetch_lectorium_data() {
    // await sleep(500);

    const cfg = {withCredentials: true};
    const [{data: users}, {data: playlists}, {data: recordings}] = await Promise.all([
            Axios.get(api_url + "api/users", cfg),
            Axios.get(api_url + "api/playlists", cfg),
            Axios.get(api_url + "api/recordings", cfg),
        ]);

    let data = {
        users: withIndex(users),
        playlists: withIndex(playlists),
        recordings: withIndex(recordings),
    };

    data.recordings.all.forEach(rec => {
        rec.operator = data.users.byId[rec.operatorId];
        rec.editor = data.users.byId[rec.editorId];
        rec.playlist = data.playlists.byId[rec.playlistId];
        rec.start = new Moment(rec.start);
        rec.end = new Moment(rec.end);
    });

    return data;
}

async function fetch_lectorium_data(dispatch) {
    dispatch(loading);

    let data;
    try {
        data = await _fetch_lectorium_data();
    } catch (e) {
        if (e.response && e.response.status === 403)
            dispatch(logout);
        console.dir(e);
        dispatch(error(e));
        throw e;
    }

    dispatch(loaded(data));
}

export {types, loading, loaded, error, fetch_lectorium_data};
