import React from "react";
import PlaylistSelector from "../selectors/PlaylistSelector";
import UserSelector from "../selectors/UserSelector";
import "./RecordingEditor.css";
import moment from "moment";
import TimePicker from 'rc-time-picker';
import "imrc-datetime-picker/dist/imrc-datetime-picker.css";
import 'rc-time-picker/assets/index.css';
import {DatetimePickerTrigger} from "imrc-datetime-picker";
import StatusSelector from "../selectors/StatusSelector";
import {useFormik} from 'formik';
import "moment/locale/ru";

const DefaultValue = {
    id: null,
    status: "PLANNED",
    name: "",
    playlistId: null,
    playlist_index: null,
    operatorId: null,
    editorId: null,
    start: null,
    duration: moment().hour(1).minute(25),
};

function fixValue(value) {
    value = {...value};
    value.end = moment(value.start).add(value.duration.hour(), 'hours').add(value.duration.minute(), 'minutes').toDate();
    delete value.duration;
    return value;
}

function RecordingEditor({defaultValue, onSubmit}) {
    defaultValue = defaultValue || {...DefaultValue, start: moment()};

    const formik = useFormik({initialValues: defaultValue, onSubmit: (val) => (onSubmit && onSubmit(fixValue(val)))});

    const value = formik.values;
    const handleChange = formik.handleChange;

    // // FUCKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKkkkk
    // if you use fresh lambdas in every render of this form, cpu will choke
    const setters = React.useMemo(() => {
        const _fieldSetter = name => val => {
            if (name === "playlist_index" && val === "")
                val = null;
            formik.setFieldValue(name, val);
        };
        const _setters = {};
        for (let name of ["status", "playlistId", "editorId", "operatorId", "start", "duration"])
            _setters[name] = _fieldSetter(name);
        return _setters;
    }, [formik.setFieldValue]);

    const fieldSetter = name => setters[name];

    return (
        <form className="RecordingEditor">
            <span> Статус </span>
            <StatusSelector value={value.status} onChange={setters["status"]}/>

            <span> Плейлист</span>
            <PlaylistSelector id={value.playlistId} onChange={fieldSetter("playlistId")}/>

            <span> Номер</span>
            <input value={value.playlist_index || ""} name="playlist_index" onChange={handleChange}/>

            <span> Название </span>
            <input value={value.name} name="name" onChange={handleChange}/>

            <span> Дата съёмки </span>
            <DatetimePickerTrigger moment={value.start} onChange={fieldSetter("start")}>
                <input className="rc-time-picker-input" value={value.start.format("ddd, D MMMM, HH:mm")} readOnly/>
            </DatetimePickerTrigger>

            <span> Длительность </span>
            <TimePicker allowEmpty={false} showSecond={false} value={value.duration} format={'h:mm'} onChange = {fieldSetter("duration")}/>

            <span>Оператор </span>
            <UserSelector id={value.operatorId} onChange={fieldSetter("operatorId")}/>

            <span> Монтирующий </span>
            <UserSelector id={value.editorId} onChange={fieldSetter("editorId")}/>
            <button type="submit" onClick={formik.handleSubmit}>OK</button>
        </form>
    );
}


export default RecordingEditor;
