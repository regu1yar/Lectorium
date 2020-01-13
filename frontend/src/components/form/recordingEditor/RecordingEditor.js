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

    const formik = useFormik({
        initialValues: defaultValue,
        onSubmit: (val) => (onSubmit && onSubmit(fixValue(val)))
    });

    const {values: value, handleChange, setFieldValue} = formik;

    const fieldSetter = React.useMemo(() => {
        const _fieldSetter = name => val => {
            if (name === "playlist_index" && val === "")
                val = null;
            setFieldValue(name, val);
        };

        const _setters = {};
        for (let name of ["status", "playlistId", "editorId", "operatorId", "start", "duration"])
            _setters[name] = _fieldSetter(name);
        return name => _setters[name];
    }, [setFieldValue]);

    return (
        <form className="RecordingEditor">
            <span> Статус </span>
            <StatusSelector value={value.status} onChange={fieldSetter("status")}/>

            <span> Плейлист</span>
            <PlaylistSelector id={value.playlistId} onChange={fieldSetter("playlistId")}/>

            <span> Номер</span>
            <input value={value.playlist_index || ""} name="playlist_index" onChange={handleChange}/>

            <span> Название </span>
            <input value={value.name} name="name" onChange={handleChange}/>

            <span> Дата съёмки </span>
            {/*TODO: fix useless rerender of DatetimePickerTrigger (due to pos update???) */}
            <DatetimePickerTrigger moment={value.start} onChange={fieldSetter("start")}>
                <input className="rc-time-picker-input" value={value.start.format("ddd, D MMMM, HH:mm")} readOnly/>
            </DatetimePickerTrigger>

            <span> Длительность </span>
            <TimePicker allowEmpty={false} showSecond={false} value={value.duration} format={'h:mm'} onChange = {fieldSetter("duration")}/>

            <span>Оператор </span>
            <UserSelector id={value.operatorId} onChange={fieldSetter("operatorId")}/>

            <span> Монтирующий </span>
            <UserSelector id={value.editorId} onChange={fieldSetter("editorId")}/>

            <button type="submit" onClick={formik.handleSubmit}> Сохранить </button>
        </form>
    );
}


export default RecordingEditor;
