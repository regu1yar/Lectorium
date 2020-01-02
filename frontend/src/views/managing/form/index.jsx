import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import RecordingEditor from "../../../components/form/recordingEditor/RecordingEditor";
import * as Redux from 'redux';
import axios from 'axios';
// import {lectorium, SET_RECORDINGS, SET_PLAYLISTS, SET_USERS} from "../../../reducers";
import {connect, Provider} from "react-redux";
import {api_url} from "../../../constants";



// const getData = async () => {
//     return {
//         data: {
//             users: await (await fetch(api_url + "api/users")).json(),
//             playlists: await (await fetch(api_url + "api/playlists")).json(),
//             recordings: await (await fetch(api_url + "api/recordings")).json(),
//         }
//     }
// };


export class _Form extends React.Component {
    render() {
        return (
            <RecordingEditor onSubmit={console.log}/>
        )
    }
}

export const Form = _Form;
// export const Form = connect(
//     store => ({
//         form: store.form,
//     })
// )(_Form);
//
// async function main() {
//     const users = await (await fetch(api_url + "api/users")).json();
//     const playlists = await (await fetch(api_url + "api/playlists")).json();
//
//     store.dispatch({type: SET_USERS, users: normalize(users)});
//     store.dispatch({type: SET_PLAYLISTS, playlists: normalize(playlists)});
//
//     let recordings = await (await fetch(api_url + "api/recordings")).json();
//     store.dispatch({type: SET_RECORDINGS, recordings: normalize(recordings)});
//
//     // async function cb(val) {
//     //     const resp = await axios.post(api_url + "api/recordings/save", val);
//     //     main();
//     // }
//     //
//     //
//     // recordings[0].id = null;
//     // ReactDOM.render(
//     //    // <RecordingsGrid recordings={recordings}/>,
//     //     <>
//     //         <RecordingEditor defaultValue={recordings[0]} users={users} playlists={playlists} onSubmit={cb}/>
//     //         <RecordingsGrid recordings={recordings} users={users} playlists={playlists}/>
//     //     </>,
//     //     document.getElementById("root"));
//     //
//
//     console.dir(store.getState());
//
//     console.log(store.getState().recordings);
//
//
//         ReactDOM.render(
//             <Provider store={store}>
//                 <RecordingEditor/>
//             </Provider>,
//             document.getElementById("root")
//         );
// }