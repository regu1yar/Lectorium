import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {SITE_STRUCTURE} from "../../constants";
const localizer = momentLocalizer(moment);

function _MyCalendar({recordings, history}) {
    const goToEditor = React.useCallback(
        (ev) => {
            console.log(ev.id);
            history.push(SITE_STRUCTURE.managing.route + ev.id);
        },
        [history]
    );

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={recordings}
                startAccessor={rec => rec.start.toDate()}
                endAccessor={rec => rec.end.toDate()}
                titleAccessor={rec => rec.name}
                defaultView="week"
                onSelectEvent={goToEditor}
            />
        </div>
    );
}

const MyCalendar = withRouter(connect(
    state => ({
        recordings: state.lectorium_data.recordings.all
    })
)(_MyCalendar));

export {MyCalendar};