import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {connect} from "react-redux";
const localizer = momentLocalizer(moment);

function recordingEvent({recording: {name, start, end}}) {
    return {
        name: name,
        start: start,
        end: end
    }
}

export function MyCalendar({recordings}) {
    const recEvents = recordings.map(recording =>
        recordingEvent(recording));

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={recEvents}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}

export default connect(
    state => ({
        recordings: state.recordings.all
    })
)(MyCalendar);