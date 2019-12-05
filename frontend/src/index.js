import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Redux from 'redux';
import {connect} from 'react-redux'
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faClock,
    faVideo,
    faFilm,
    faPhotoVideo,
    faListOl,
    faBars,
    faListUl,
    faCalendarDay
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

// ReactDOM.render(<App />, document.getElementById('root'));

let users = null;
let playlists = null;
const api_url = "http://192.168.0.110:8080/"


function Rec({recording: {name, time, playlist: {name: playlistName}, playlist_index, operator, editor, status}}) {
    const shotTimeIcon = <FontAwesomeIcon icon={faCalendarDay} title="Shot time"/>;
    const operatorIcon = <FontAwesomeIcon icon={faVideo} title="Operator"/>;
    const editorIcon = <FontAwesomeIcon icon={faPhotoVideo} title="Editor"/>;
    const playlistIcon = <FontAwesomeIcon icon={faListUl} title="Playlist"/>;
    return (
        <div className="recording">
            <div className={`title ${status.toLowerCase()}`}>{playlistIcon} {playlistName} <span
                className="number">{playlist_index}</span></div>
            <span className="name"> <input value={name} onChange={(ev) => console.log(ev.target.value)}/> </span>
            <span>{shotTimeIcon} {moment(time).format("YYYY-MM-DD")} </span>
            <span>{operatorIcon} {operator.name} </span>
            <span>{editorIcon} {editor.name} </span>
        </div>
    );
}


async function main() {
    users = await (await fetch(api_url + "api/users")).json();
    playlists = await (await fetch(api_url + "api/playlists")).json();

    let recordings = await (await fetch(api_url + "api/recordings")).json();
    console.log(recordings);

    ReactDOM.render(
        <div className="list">
            {recordings.map(recording => <Rec key={recording.id} recording={recording}/>)}
        </div>,
        document.getElementById("root"));

    console.log(users);

}

main();

ReactDOM.render(<div>awdwad</div>, document.getElementById("root"));