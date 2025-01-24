import React from 'react'
import { useEventContext } from '../../../context/eventContext'
import '../../../Styles/myEvents.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../connections/firebase';
import { CircularProgress, Box, Typography } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { useUserContext } from '../../../context/userContext';
import { getDate } from '../dashboard/dashboard';

const MyEvents = () => {
    const navigate = useNavigate();
    let { state: { events }, dispatch } = useEventContext()
    const { state: { user } } = useUserContext()
    events = events.filter(event => event.userID === user.id)
    const tableHeader = ["title", "category", "location", "startdate", "enddate", "status", "actions"]
    const [isDeleting, setIsDeleting] = useState("")

    const handleDelete = async (eventId) => {
        try {
            setIsDeleting(eventId)
            await deleteDoc(doc(firestore, 'event', eventId));
            dispatch({ type: "REMOVE_EVENT", payload: eventId })
            setIsDeleting("")
        } catch (error) {
            setIsDeleting("")
            console.error('Error deleting event: ', error);
        }
    };

    // if (events.length === 0) {
    //     return (
    //         <Box sx={{ textAlign: 'center', mt: 4 }}>
    //             <EventBusyIcon sx={{ fontSize: 80, color: 'grey' }} />
    //             <Typography variant="h6" sx={{ mt: 2 }}>No created events</Typography>
    //         </Box>
    //     );
    // }

    return (
        <div className='wholeMyEventsdiv'>
            <div className='inputdiv'>
                <input className='myeventsInput' type="text" placeholder='Search Event ' />
                <button className='inputButton'>Search</button>
            </div>
            <div
                className='addButton'
                onClick={() => navigate('/auth/createEventPage')}
            >
                <AddIcon />
                Add
            </div>

            <div className='myEventstable'>
                {/* this is the myevents page */}
                {/* {events.map((event) =>(
        <div key={event.id}>
            <p>{event.title} </p>
            <p>{event.category} </p>
        
        </div>
      ))} */}
                <table>
                    <thead>
                        {tableHeader.map((thElement) => (
                            <th className='tableHeader' key={thElement}>{thElement}</th>
                        ))}
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                {/* <td>{event.category}</td> */}
                                <td>
                                    {event.categories.map((cat, index) => (
                                        <span key={index} className='categoryChip'>{cat}</span>
                                    ))}
                                </td>
                                <td>{event.location}</td>
                                <td> {dayjs(getDate(event.startdate)).format('DD-MM-YYYY')} </td>
                                <td> {dayjs(getDate(event.enddate)).format('DD-MM-YYYY')} </td>
                                <td>
                                    {dayjs().isBefore(dayjs(getDate(event.startdate))) ? 'Upcoming' :
                                        dayjs().isAfter(dayjs(getDate(event.enddate))) ? 'Completed' : 'Ongoing'}
                                </td>
                                <td style={{}}>

                                    <span onClick={() => navigate(`/auth/events/my-events/${event.id}`)}>
                                        <VisibilityIcon className='VisibilityIcon' />
                                    </span>
                                    <span onClick={() => navigate(`/auth/events/my-events/${event.id}`)}>
                                        <EditIcon className='EditIcon' />
                                    </span>
                                    <span onClick={() => handleDelete(event.id)}>
                                        {isDeleting == event.id ? <CircularProgress /> : <DeleteIcon className='DeleteIcon' />}
                                    </span>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
            {
                events.length === 0 &&
                <Box sx={{ textAlign: 'center', mt: 4, display: 'block' }}>
                    <EventBusyIcon sx={{ fontSize: 80, color: 'grey' }} />
                    <Typography variant="h6" sx={{ mt: 2 }}>No created events</Typography>
                </Box>
            }
        </div>
    )
}

export default MyEvents
