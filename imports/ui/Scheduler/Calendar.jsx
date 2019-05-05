import React, {useState} from 'react';
import BigCalendar from 'react-big-calendar'
import moment from '../../utils/moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = props => {
    const [events, setEvents] = useState([]);
    return (<div>
        <BigCalendar
        localizer={localizer}
        events={events}
        views={["month", "week", "day", "agenda"]}
        timeslots={2}
        defaultView="month"
        defaultDate={new Date()}
        selectable={true}
        />
    </div>);
  };

export default MyCalendar;