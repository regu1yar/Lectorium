import React from 'react';
import './index.css';
import RecordingEditor from "../../../components/form/recordingEditor/RecordingEditor";
import Axios from 'axios';
import {connect} from "react-redux";
import {api_url} from "../../../constants";
import {fetch_lectorium_data} from "../../../actions/lectorium_data";
import {Status} from "../../../reducers/lectorium_data";


export class _Form extends React.Component {
    submit = async recording => {
        await Axios.post(api_url + "api/recordings/save", recording, {withCredentials: true});
        this.props.dispatch(fetch_lectorium_data);
    };

    render() {
        if (this.props.data.status === Status.LOADING) {
            return <p> Loading... </p>;
        } else if (this.props.data.status === Status.ERROR) {
            return <p> Error! {this.props.data.error.toString()} </p>
        }

        return (
            <RecordingEditor onSubmit={this.submit}/>
        )
    }
}

export const Form = connect(state => ({data: state.lectorium_data}))(_Form);
