import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Recording from "../recording/Recording";

const localizer = momentLocalizer(moment)

function recordingEvent({recording: {name, start, end}}) {
    return {
        name: name,
        start: start,
        end: end
    }
}

export function MyCalendar({recordings}) {
    const state = {
        events: recordings.map(recordingEvent)
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={recordings.map(recordingEvent)}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}