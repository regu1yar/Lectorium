import {connect} from "react-redux";
import React from "react";
import {MyCalendar} from "../../components/calendar/Calendar";
import {fetch_lectorium_data} from "../../actions";
import {Status} from "../../reducers";

function _Calendar({state, dispatch}) {
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
            <MyCalendar/>
        </div>
    )
}

const Calendar = connect(
    state => ({state})
)(_Calendar);

export {Calendar};