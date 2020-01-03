import {connect} from "react-redux";
import {Status} from "../../reducers";
import React from "react";
import {fetch_lectorium_data} from "../../actions";
import RecordingsGrid from "../../components/recordingGrid/RecordingsGrid";

function _Overview({state, dispatch}) {
    const [fetched, setFetched] = React.useState(false);

    React.useEffect(() => {
        if (!fetched) {
            dispatch(fetch_lectorium_data);
            setFetched(false);
        }
    }, []);

    if (state.status === Status.LOADING) {
        return <p> "Loading..." </p>;
    } else if (state.status === Status.ERROR) {
        console.log(state);
        return <p>Error! {state.error.toString()}</p>;
    }

    return (
        <div>
            <button onClick={() => dispatch(fetch_lectorium_data)}>refresh</button>
            <RecordingsGrid/>
        </div>
    )
}

const Overview = connect(
    state => ({state})
)(_Overview);

export {Overview};