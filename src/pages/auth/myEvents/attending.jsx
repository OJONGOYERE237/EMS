import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../../context/eventContext';
import { useUserContext } from '../../../context/userContext';
import { fetchUser } from '../../../connections/firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const Attending = () => {
    const { state: { events } } = useEventContext();
    const { state: { user } } = useUserContext();
    const [attendeesData, setAttendeesData] = useState([]);

    useEffect(() => {
        const fetchAttendees = async () => {
            const userEvents = events.filter(event => event.userID === user.id);
            const attendeesPromises = userEvents.map(async (event) => {
                if (event.attendees) {
                    const attendees = await Promise.all(event.attendees.map(async (attendeeId) => {
                        const attendee = await fetchUser(attendeeId);
                        return attendee;
                    }));
                    return { event, attendees };
                } else {
                    return { event, attendees: [] };
                }
            });
            const attendeesData = await Promise.all(attendeesPromises);
            setAttendeesData(attendeesData);
        };

        fetchAttendees();
    }, [events, user.id]);

    if (attendeesData.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <EventBusyIcon sx={{ fontSize: 80, color: 'grey' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>No created events</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {attendeesData.map(({ event, attendees }) => (
                <Box key={event.id} sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>{event.title}</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendees.map((attendee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{attendee.username}</TableCell>
                                        <TableCell>{attendee.email}</TableCell>
                                        <TableCell>{attendee.phoneNumber}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </Box>
    );
};

export default Attending;
