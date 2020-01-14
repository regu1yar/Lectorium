import React from 'react';
import './index.css';
import RecordingEditor from "../../../components/form/recordingEditor/RecordingEditor";
import Axios from 'axios';
import {connect} from "react-redux";
import {api_url, SITE_STRUCTURE} from "../../../constants";
import {fetch_lectorium_data} from "../../../actions/lectorium_data";
import {Status} from "../../../reducers/lectorium_data";
import {withRouter} from "react-router";


export class _Form extends React.Component {
    submit = async recording => {
        await Axios.post(api_url + "api/recordings/save", recording, {withCredentials: true});
        this.props.dispatch(fetch_lectorium_data);
        this.props.history.push(SITE_STRUCTURE.schedule.route)
        // this.props.history.goBack();
    };

    delete = async recording => {
        await Axios.post(api_url + "api/recordings/delete", recording, {withCredentials: true});
        this.props.dispatch(fetch_lectorium_data);
        this.props.history.goBack();
    };

    render() {
        if (this.props.data.status === Status.LOADING) {
            return <p> Loading... </p>;
        } else if (this.props.data.status === Status.ERROR) {
            return <p> Error! {this.props.data.error.toString()} </p>
        }

        let recording_id = this.props.match.params.id;
        let recording = null;
        let prefix = "Создание новой записи";
        let onDelete = null;
        if (recording_id !== undefined) {
            prefix = "Редактирование существующей записи";
            recording = this.props.data.recordings.byId[recording_id]; // TODO: if does not exist
            onDelete = this.delete;
        }

        return (
            <div>
                {prefix}
                <RecordingEditor onSubmit={this.submit} onDelete={onDelete} defaultValue={recording}/>
            </div>
        )
    }
}

export const Form = withRouter(connect(state => ({data: state.lectorium_data}))(_Form));