import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../../context/eventContext';
import { useUserContext } from '../../../context/userContext';
import '../../../Styles/registered.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { getDate } from '../dashboard/dashboard';

const RegisteredEvents = () => {
    const navigate = useNavigate();
    const { state: { events } } = useEventContext();
    const { state: { user } } = useUserContext();
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        const userRegisteredEvents = events.filter(event => event.attendees && event.attendees.includes(user.id));
        setRegisteredEvents(userRegisteredEvents);
    }, [events, user.id]);

    const tableHeader = ["Title", "Category", "Location", "Start Date", "End Date", "Status"];

    if (registeredEvents.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <EventBusyIcon sx={{ fontSize: 80, color: 'grey' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>You are not attending any events</Typography>
            </Box>
        );
    }

    return (
        <div className='wholeMyEventsdiv'>
            <div className='inputdiv'>
                <input className='myeventsInput' type="text" placeholder='Search Event ' />
                <button className='inputButton'>Search</button>
            </div>

            <div className='myEventstable'>
                <table>
                    <thead>
                        {tableHeader.map((thElement) => (
                            <th className='tableHeader' key={thElement}>{thElement}</th>
                        ))}
                    </thead>
                    <tbody>
                        {registeredEvents.map((event) => (
                            <tr key={event.id}>
                                <td onClick={() => navigate(`/eventDetailsPage/${event.id}`)} style={{ cursor: 'pointer', color: 'blue' }}>
                                    {event.title}
                                </td>
                                <td>
                                    {event.categories.map((cat, index) => (
                                        <span key={index} className='categoryChip'>{cat}</span>
                                    ))}
                                </td>
                                <td>{event.location}</td>
                                <td>{dayjs(getDate(event.startdate)).format('DD-MM-YYYY')}</td>
                                <td>{dayjs(getDate(event.enddate)).format('DD-MM-YYYY')}</td>
                                <td>
                                    {dayjs().isBefore(dayjs(getDate(event.startdate))) ? 'Upcoming' :
                                        dayjs().isAfter(dayjs(getDate(event.enddate))) ? 'Completed' : 'Ongoing'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredEvents;
