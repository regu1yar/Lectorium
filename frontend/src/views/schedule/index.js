import {connect} from "react-redux";
import {Status} from "../../reducers/lectorium_data";
import React from "react";
import {fetch_lectorium_data} from "../../actions/lectorium_data";
import RecordingsGrid from "../../components/recordingGrid/RecordingsGrid";

function _Overview({data, dispatch}) {
    const [fetched, setFetched] = React.useState(false);

    React.useEffect(() => {
        if (!fetched) {
            dispatch(fetch_lectorium_data);
            setFetched(false);
        }
    }, [fetched, dispatch]);

    const refheshButton = <button onClick={() => dispatch(fetch_lectorium_data)}>refresh</button>

    if (data.status === Status.LOADING) {
        return <p> "Loading..." </p>;
    } else if (data.status === Status.ERROR) {
        return <p>Error! {data.error.toString()} {refheshButton} </p>;
    }

    return (
        <div>
            {refheshButton}
            <RecordingsGrid/>
        </div>
    )
}

const Overview = connect(
    state => ({data: state.lectorium_data})
)(_Overview);

export {Overview};