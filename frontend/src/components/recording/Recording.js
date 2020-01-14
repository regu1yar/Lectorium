import React from "react";
import './Recording.css';
import {shotTimeIcon, operatorIcon, editorIcon, playlistIcon} from "../icons";
import {Link} from "react-router-dom";
import {SITE_STRUCTURE} from "../../constants";

function Recording({recording: {id, name, start, playlist, playlist_index, operator, editor, status}}) {
    return (
        <Link className={`recording ${status.toLowerCase()}`} to={SITE_STRUCTURE.managing.route + `${id}`}>
            <div className="title">{playlistIcon} {playlist ? playlist.name : "-"} <span
                className="number">{playlist_index !== null ? playlist_index : "-"}</span></div>
            <span className="name"> {name} </span>
            <span>{shotTimeIcon} {start.format("YYYY-MM-DD")} </span>
            <span>{operatorIcon} {operator ? operator.name : "-"} </span>
            <span>{editorIcon} {editor ? editor.name : "-"} </span>
        </Link>
    );
}

export default Recording;