import React from "react";
import PlaylistSelector from "../selectors/PlaylistSelector";
import {shotTimeIcon, playlistIcon} from "../icons";
import UserSelector from "../selectors/UserSelector";
import "./RecordingEditor.css";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import StatusSelector from "../selectors/StatusSelector";
import { Formik, useFormik, useField, Field, Form } from 'formik';
import {connect} from "react-redux";



function RecordingEditor({defaultValue, users, playlists, onSubmit}) {
    console.dir(defaultValue);

    const def = {
        status: "PLANNED",
        name: "",
        playlists: null,
        playlist_index: null,
        operator: null,
        editor: null,
        time: null,
    };

    const dvFixed = (defaultValue ? {...defaultValue, time: moment(defaultValue.time).toDate()} : def);
    const formik = useFormik({initialValues: dvFixed, onSubmit: (val) => (onSubmit && onSubmit(val))});

    const value = formik.values;
    const handleChange = formik.handleChange;

    const fieldSetter = name => val => {
        console.log(name, val);
        formik.setFieldValue(name, val);
    };

    return (
        <form className="RecordingEditor">
            <label>
                Статус: <StatusSelector value={value.status} onChange={fieldSetter("status")}/>
            </label>
            <label>
                Плейлист: <PlaylistSelector playlists={playlists} id={value.playlist ? value.playlist.id : null} onChange={fieldSetter("playlist")}/>
            </label>
            <label>
                Номер: <input value={value.playlist_index} name="playlist_index" onChange={handleChange}/>
            </label>
            <label>
                Название: <input value={value.name} name="name" onChange={handleChange}/>
            </label>
            <label>
                Дата съёмки: <DateTimePicker value={value.time} onChange={fieldSetter("time")}/>
            </label>
            <label>
                Оператор: <UserSelector users={users} id={value.operator ? value.operator.id : null} onChange={fieldSetter("operator")}/>
            </label>
            <label>
                Монтирующий: <UserSelector users={users} id={value.editor ? value.editor.id : null} onChange={fieldSetter("editor")}/>
            </label>
            <button type="submit" onClick={formik.handleSubmit}>OK</button>
        </form>
    );
}


function denormalizeRec(state, rec) {
    return {
        ...rec,
        editor: state.users.byId[rec.editor],
        operator: state.users.byId[rec.operator],
        playlist: state.playlists.byId[rec.playlist],
    }
}



export default connect(
    state => ({
        defaultValue: denormalizeRec(state, state.recordings.byId[state.recordings.allIds[0]]),
        users: state.users.allIds.map(id => state.users.byId[id]),
        playlists: state.playlists.allIds.map(id => state.users.byId[id]),
    })
)(RecordingEditor);

// function RecForm() {
//     return (
//         <form>
//             <select>
//                 {}
//             </select>
//         </form>
//     )
// }
