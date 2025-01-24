import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEventContext } from '../../../context/eventContext';
import { TextField, Typography, Box, Select, FormControl, Button, MenuItem, Chip, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore, handleEventImageUpload } from '../../../connections/firebase';
import { setDoc, doc } from 'firebase/firestore';

const fieldBoxStyle = { display: "flex", justifyContent: "start", alignItems: "end", gap: 1, width: "100%" };
const fieldTextStyle = { width: "25%" };
const fieldInputStyle = { width: "60%" };
const allCategories = [
    "Business", "Educational", "Corporate", "Cultural", "Comedy", "Tech & Innovation", "Health & Wellness", "Sports", "Religious", "Community & Social Impact", "Agriculture & Environment"
];
const types = [
    "Seminar", "Webinar", "Conference", "BootCamp", "Workshop", "Retreat", "Hackathon", "Symposium", "Campaign", "Concert"
];

export function convertTimestampToDate(timestamp) {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds
    return new Date(milliseconds); // Create and return a JS Date object
}

const MyEventDetails = () => {
    const { id } = useParams();
    const { state: { events }, dispatch } = useEventContext();
    const [imageFile, setImageFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        const event = events.find(event => event.id === id);
        setEvent({
            ...event,
            starttime: event.starttime instanceof Date ? event.starttime : convertTimestampToDate(event.starttime),
            endtime: event.endtime instanceof Date ? event.endtime : convertTimestampToDate(event.endtime),
            startdate: event.startdate instanceof Date ? event.startdate : convertTimestampToDate(event.startdate),
            enddate: event.enddate instanceof Date ? event.enddate : convertTimestampToDate(event.enddate)
        });
    }, [id, events]);

    const handleFileChange = (e) => {
        const [file] = e.target.files;
        if (file) {
            setImageFile(file);
            let reader = new FileReader();
            reader.onload = function (ev) {
                setEvent({ ...event, imageUrl: ev.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCategory = (category) => {
        if (!event.categories.includes(category)) {
            setEvent({ ...event, categories: [...event.categories, category] });
        }
    };

    const handleDeleteCategory = (categoryToDelete) => {
        setEvent({ ...event, categories: event.categories.filter(category => category !== categoryToDelete) });
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            let imageUrl = '';
            if (imageFile) {
                imageUrl = await handleEventImageUpload(imageFile);
            }
            const eventRef = doc(firestore, "event", event.id);
            const { id, ...eventProps } = event;
            await setDoc(eventRef, { ...eventProps, ...(imageUrl && { imageUrl }) }, { merge: true });
            dispatch({ type: 'UPDATE_EVENT', payload: event });
            console.log("Event updated successfully");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error updating event: ", error);
        }
        setEditMode(false);
    };

    const handleCancel = () => {
        const event = events.find(event => event.id === id);
        setEvent({
            ...event,
            starttime: event.starttime instanceof Date ? event.starttime : convertTimestampToDate(event.starttime),
            endtime: event.endtime instanceof Date ? event.endtime : convertTimestampToDate(event.endtime),
            startdate: event.startdate instanceof Date ? event.startdate : convertTimestampToDate(event.startdate),
            enddate: event.enddate instanceof Date ? event.enddate : convertTimestampToDate(event.enddate)
        });
        setEditMode(false);
    };

    if (!event) return <div>Loading...</div>;

    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2 }}>
                {/* the left box */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", gap: 4, width: "45%" }}>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Title: </Typography>
                        {editMode ? (
                            <TextField
                                sx={fieldInputStyle}
                                size="small"
                                variant="standard"
                                value={event.title}
                                onChange={(e) => { setEvent({ ...event, title: e.target.value }) }}
                            />
                        ) : (
                            <Typography>{event.title}</Typography>
                        )}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Categories: </Typography>
                        {editMode ? (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {event.categories.map((category) => (
                                    <Chip
                                        key={category}
                                        label={category}
                                        onDelete={() => handleDeleteCategory(category)}
                                        deleteIcon={<DeleteIcon />}
                                    />
                                ))}
                                <Select
                                    sx={fieldInputStyle}
                                    size='small'
                                    variant='standard'
                                    value=""
                                    onChange={(e) => { handleAddCategory(e.target.value) }}
                                >
                                    {allCategories.map((category) => (
                                        <MenuItem key={category} value={category} disabled={event.categories.includes(category)}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {event.categories.map((category) => (
                                    <Chip key={category} label={category} />
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Type: </Typography>
                        {editMode ? (
                            <Select
                                sx={fieldInputStyle}
                                size='small'
                                variant='standard'
                                value={event.type}
                                onChange={(e) => { setEvent({ ...event, type: e.target.value }) }}
                            >
                                {types.map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        ) : (
                            <Typography>{event.type}</Typography>
                        )}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Free or Paid: </Typography>
                        {editMode ? (
                            <FormControl sx={fieldInputStyle}>
                                <Select
                                    size='small'
                                    variant='standard'
                                    value={event.isPaid}
                                    onChange={(e) => { setEvent({ ...event, isPaid: e.target.value }) }}
                                >
                                    <MenuItem value={false}>Free</MenuItem>
                                    <MenuItem value={true}>Paid</MenuItem>
                                </Select>
                            </FormControl>
                        ) : (
                            <Typography>{event.isPaid ? 'Paid' : 'Free'}</Typography>
                        )}
                    </Box>
                    {event.isPaid && (
                        <Box sx={fieldBoxStyle}>
                            <Typography sx={fieldTextStyle}>Fee: </Typography>
                            {editMode ? (
                                <TextField
                                    sx={fieldInputStyle}
                                    size="small"
                                    variant="standard"
                                    value={event.fee}
                                    onChange={(e) => { setEvent({ ...event, fee: e.target.value }) }}
                                />
                            ) : (
                                <Typography>{event.fee}</Typography>
                            )}
                        </Box>
                    )}
                    <Box sx={{}}>
                        <Typography>Thumbnail: </Typography>
                        {editMode ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                                <img width={'100%'} style={{ maxHeight: '200px', margin: 'auto' }} src={event.imageUrl} alt='profile' />
                                <label htmlFor="imageInput" className="imageLabel">
                                    <FileUploadIcon />
                                    upload image
                                    <input onChange={handleFileChange} style={{ display: "none" }} id='imageInput' className='imageInput' type="file" required />
                                </label>
                            </Box>
                        ) : (
                            <img width={'100%'} style={{ maxHeight: '200px', marginBottom: '10px' }} src={event.imageUrl} alt='profile' />
                        )}
                    </Box>
                </Box>
                {/* the right box */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", gap: 4, width: "45%" }}>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Location: </Typography>
                        {editMode ? (
                            <TextField
                                sx={fieldInputStyle}
                                size="small"
                                variant="standard"
                                value={event.location}
                                onChange={(e) => { setEvent({ ...event, location: e.target.value }) }}
                            />
                        ) : (
                            <Typography>{event.location}</Typography>
                        )}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Start Date: </Typography>
                        {editMode ? (
                            <DatePicker
                                value={dayjs(event.startdate)}
                                onChange={(newdate) => { setEvent({ ...event, startdate: new Date(newdate) }) }}
                            />
                        ) : (
                            <Typography>{dayjs(event.startdate).format('YYYY-MM-DD')}</Typography>
                        )}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>End Date: </Typography>
                        {editMode ? (
                            <DatePicker
                                value={dayjs(event.enddate)}
                                onChange={(newdate) => { setEvent({ ...event, enddate: new Date(newdate) }) }}
                            />
                        ) : (
                            <Typography>{dayjs(event.enddate).format('YYYY-MM-DD')}</Typography>
                        )}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Start Time: </Typography>
                        {editMode ? (
                            <TimePicker
                                value={dayjs(event.starttime)}
                                onChange={(newtime) => { setEvent({ ...event, starttime: new Date(newtime) }) }}
                            />
                        ) : (
                            <Typography>{dayjs(event.starttime).format('HH:mm')}</Typography>
                        )}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>End Time: </Typography>
                        {editMode ? (
                            <TimePicker
                                value={dayjs(event.endtime)}
                                onChange={(newtime) => { setEvent({ ...event, endtime: new Date(newtime) }) }}
                            />
                        ) : (
                            <Typography>{dayjs(new Date(event.endtime)).format('HH:mm')}</Typography>
                        )}
                    </Box>
                    <Box sx={{ ...fieldBoxStyle, alignItems: "start" }}>
                        <Typography sx={fieldTextStyle}>Description: </Typography>
                        {editMode ? (
                            <TextField
                                sx={fieldInputStyle}
                                size="small"
                                value={event.description}
                                variant='standard'
                                onChange={(e) => { setEvent({ ...event, description: e.target.value }) }}
                                multiline
                                rows={4}
                                placeholder='Describe your event'
                            />
                        ) : (
                            <Typography sx={fieldInputStyle}>{event.description}</Typography>
                        )}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "start", width: "100%" }}>
                {editMode ? (
                    <Box sx={{ display: "flex", gap: 2, width: { xs: "100%", md: "50%" } }}>
                        <Button variant='contained' sx={{ mt: 3, padding: 2, width: "60%", width: "50%" }} onClick={handleSave}>
                            {isLoading ? <CircularProgress sx={{ color: "white" }} /> : "Save"}
                        </Button>
                        <Button variant='contained' sx={{ mt: 3, padding: 2, width: "60%", width: "50%" }} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                ) : (
                    <Button variant='contained' sx={{ mt: 3, padding: 2, width: "50%", margin: 'auto' }} onClick={() => setEditMode(true)}>
                        Edit
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default MyEventDetails;
