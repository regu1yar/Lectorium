import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import RecordingEditor from "../../../components/form/recordingEditor/RecordingEditor";
import * as Redux from 'redux';
import Axios from 'axios';
// import {lectorium, SET_RECORDINGS, SET_PLAYLISTS, SET_USERS} from "../../../reducers";
import {connect, Provider} from "react-redux";
import {api_url} from "../../../constants";
import {fetch_lectorium_data} from "../../../actions";
import {Status} from "../../../reducers";
import moment from "moment";


export class _Form extends React.Component {
    submit = async recording => {
        recording.end = moment(recording.start).add(recording.duration.hour(), 'hours').add(recording.duration.minute(), 'minutes').toDate();
        delete recording.duration;
        await Axios.post(api_url + "api/recordings/save", recording);
        this.props.dispatch(fetch_lectorium_data);
    };

    render() {
        if (this.props.state.status === Status.LOADING) {
            return <p> Loading... </p>;
        } else if (this.props.state.status === Status.ERROR) {
            return <p> Error! {this.props.state.error.toString()} </p>
        }

        return (
            <RecordingEditor onSubmit={this.submit}/>
        )
    }
}

export const Form = connect(state => ({state}))(_Form);
