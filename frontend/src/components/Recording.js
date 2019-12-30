import moment from "moment";
import React from "react";
import './Recording.css';
import {shotTimeIcon, operatorIcon, editorIcon, playlistIcon} from "./icons";

function Recording({recording: {name, time, playlist, playlist_index, operator, editor, status}}) {
    return (
        <div className={`recording ${status.toLowerCase()}`}>
            <div className="title">{playlistIcon} {playlist ? playlist.name : "-"} <span
                className="number">{playlist_index !== null ? playlist_index : "-"}</span></div>
            <span className="name"> {name} </span>
            <span>{shotTimeIcon} {moment(time).format("YYYY-MM-DD")} </span>
            <span>{operatorIcon} {operator ? operator.name : "-"} </span>
            <span>{editorIcon} {editor ? editor.name : "-"} </span>
        </div>
    );
}

export default Recording;