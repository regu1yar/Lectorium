import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RecordingsGrid from "./components/RecordingsGrid";
import RecordingEditor from "./components/RecordingEditor";
import Recording from "./components/Recording";
import * as Redux from 'redux';
import axios from 'axios';
import {lectorium, SET_RECORDINGS, SET_PLAYLISTS, SET_USERS} from "./reducers";
import {connect, Provider} from "react-redux";

// ReactDOM.render(<App />, document.getElementById('root'));

// const api_url = "http://192.168.0.110:8080/";
const api_url = "http://localhost:8080/";

const store = Redux.createStore(lectorium,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


function normalize(objArray) {
    return {
        byId: Object.fromEntries(objArray.map(obj => [obj.id, obj])),
        allIds: objArray.map(obj => obj.id),
    };
}


async function main() {
    const users = await (await fetch(api_url + "api/users")).json();
    const playlists = await (await fetch(api_url + "api/playlists")).json();

    store.dispatch({type: SET_USERS, users: normalize(users)});
    store.dispatch({type: SET_PLAYLISTS, playlists: normalize(playlists)});

    let recordings = await (await fetch(api_url + "api/recordings")).json();
    store.dispatch({type: SET_RECORDINGS, recordings: normalize(recordings)});

    // async function cb(val) {
    //     const resp = await axios.post(api_url + "api/recordings/save", val);
    //     main();
    // }
    //
    //
    // recordings[0].id = null;
    // ReactDOM.render(
    //    // <RecordingsGrid recordings={recordings}/>,
    //     <>
    //         <RecordingEditor defaultValue={recordings[0]} users={users} playlists={playlists} onSubmit={cb}/>
    //         <RecordingsGrid recordings={recordings} users={users} playlists={playlists}/>
    //     </>,
    //     document.getElementById("root"));
    //

    console.dir(store.getState());

    console.log(store.getState().recordings);
    ReactDOM.render(
        <Provider store={store}>
            <RecordingEditor/>
        </Provider>,
        document.getElementById("root")
    );
}

main();

function UsersDisplay({users}) {
    console.dir(users);
    return (
        <ul>
            AA
            {users.allIds.map(id => <li key={id}>{users.byId[id].name}</li>)}
            BB
        </ul>
    )
}

UsersDisplay = connect(
    state => ({users: state.users})
)(UsersDisplay);



// ReactDOM.render(
//     <Provider store={store}>
//         <RecordingEditor/>
//     </Provider>,
//     document.getElementById("root")
// );