import Recording from "../recording/Recording";
import React from "react";
import "./RecordingsGrid.css";
// import Modal from "react-modal";
import {connect} from "react-redux";
import {fetch_lectorium_data} from "../../actions";

function sortByKey(array, keyFn) {
    return array.sort((a, b) => {
        const [ka, kb] = [keyFn(a), keyFn(b)];
        if (ka < kb) return -1;
        if (ka > kb) return 1;
        return 0;
    });
}

function RecordingsGrid({recordings}) {
    recordings = sortByKey(recordings, rec => rec.time);

    return (
        <div className="grid">
            {recordings.map(recording =>
                <Recording key={recording.id} recording={recording}/>)
            }
        </div>
    );
}

export default connect(
    state => ({
        recordings: state.recordings.all
    })
)(RecordingsGrid);
