import Recording from "../recording/Recording";
import React from "react";
import "./RecordingsGrid.css";
// import Modal from "react-modal";
import RecordingEditor from "../recordingEditor/RecordingEditor";
import {connect} from "react-redux";

function RecordingsGrid({recordings, playlists, users}) {
    const [show, setShow] = React.useState(false);

    return (
        <div className="grid">
            {recordings.map(recording =>
                <Recording key={recording.id} recording={recording}/>)
            }
            {/* TODO: button */}
            <div className="addNew" onClick={() => setShow(!show)}>
                Add new!
            </div>
        </div>
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
        recordings: state.recordings.allIds.map(id => denormalizeRec(state, state.recordings.byId[id]))
    })
)(RecordingsGrid);
