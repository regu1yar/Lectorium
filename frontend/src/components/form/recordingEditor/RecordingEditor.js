import React from "react";
import PlaylistSelector from "../selectors/PlaylistSelector";
import {shotTimeIcon, playlistIcon} from "../../icons";
import UserSelector from "../selectors/UserSelector";
import "./RecordingEditor.css";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import StatusSelector from "../selectors/StatusSelector";
import { Formik, useFormik, useField, Field, Form } from 'formik';
import {connect} from "react-redux";



function RecordingEditor({defaultValue, users, playlists, onSubmit}) {
    const def = {
        status: "PLANNED",
        name: "",
        playlistId: null,
        playlist_index: 5, // TODO: nullability
        operatorId: null,
        editorId: null,
        time: null,
    };

    const dvFixed = (defaultValue ? {...defaultValue, time: moment(defaultValue.time).toDate()} : def);
    const formik = useFormik({initialValues: dvFixed, onSubmit: (val) => (onSubmit && onSubmit(val))});

    const value = formik.values;
    const handleChange = formik.handleChange;

    // // FUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKkkkk
    // if you use fresh lambdas in every render of this form, cpu will choke
    const setters = React.useMemo(() => {
        const _fieldSetter = name => val => {
            console.log(name, val);
            formik.setFieldValue(name, val);
        };
        const _setters = {};
        for (let name of ["status", "playlistId", "editorId", "operatorId", "time"])
            _setters[name] = _fieldSetter(name);
        return _setters;
    }, [formik.setFieldValue]);

    const fieldSetter = name => setters[name];

    return (
        <form className="RecordingEditor">
            <label>
                Статус: <StatusSelector value={value.status} onChange={setters["status"]}/>
            </label>
            <label>
                Плейлист: <PlaylistSelector id={value.playlistId} onChange={fieldSetter("playlistId")}/>
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
                Оператор: <UserSelector id={value.operatorId} onChange={fieldSetter("operatorId")}/>
            </label>
            <label>
                Монтирующий: <UserSelector id={value.editorId} onChange={fieldSetter("editorId")}/>
            </label>
            <button type="submit" onClick={formik.handleSubmit}>OK</button>
        </form>
    );
}


export default connect(
    state => ({
        // defaultValue: denormalizeRec(state, state.recordings.byId[state.recordings.allIds[0]]),
        users: state.users,
        playlists: state.playlists,
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
