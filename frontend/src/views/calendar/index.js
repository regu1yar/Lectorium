import {connect} from "react-redux";
import React from "react";
import {MyCalendar} from "../../components/calendar/Calendar";
import {fetch_lectorium_data} from "../../actions/lectorium_data";
import {Status} from "../../reducers/lectorium_data";

function _Calendar({data, dispatch}) {
    const [fetched, setFetched] = React.useState(false);

    React.useEffect(() => {
        if (!fetched) {
            dispatch(fetch_lectorium_data);
            setFetched(false);
        }
    }, []);

    const refreshButton = <button onClick={() => dispatch(fetch_lectorium_data)}>refresh</button>;

    if (data.status === Status.LOADING) {
        return <p> "Loading..." </p>;
    } else if (data.status === Status.ERROR) {
        return <p>Error! {data.error.toString()} {refreshButton} </p>;
    }

    return (
        <div>
            {refreshButton}
            <MyCalendar recordings={data.recordings.all}/>
        </div>
    )
}

const Calendar = connect(
    state => ({data: state.lectorium_data})
)(_Calendar);

export {Calendar};