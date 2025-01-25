import React, { useState } from 'react';
import { addEvent } from '../connections/firebase';
import { useUserContext } from '../context/userContext';
import { useEventContext } from '../context/eventContext';
import { useNavigate } from 'react-router-dom';
import "../Styles/createEventPage.css";
import { TextField, Typography, Box, Select, FormControl, Button, MenuItem, Chip, IconButton, CircularProgress } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

const fieldBoxStyle = { display: "flex", justifyContent: "start", alignItems: "end", gap: 1, width: "100%" }
const fieldTextStyle = { width: "25%" }
const fieldInputStyle = { width: "60%" }
const CreateEventPage = () => {
    const [title, setTitle] = useState("")
    const [categories, setCategories] = useState([])
    const [type, setType] = useState("")
    const [isPaid, setIsPaid] = useState(true)
    const [fee, setFee] = useState("")
    const [location, setLocation] = useState("")
    const [startdate, setStartdate] = useState(new Date())
    const [enddate, setEnddate] = useState(new Date())
    const [starttime, setStarttime] = useState(new Date())
    const [endtime, setEndtime] = useState(new Date())
    const [imageFile, setImageFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState('')
    const { state: { user } } = useUserContext()
    const { dispatch } = useEventContext()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const createEvent = () => { console.log({ title, categories, type, isPaid, fee, location, description, startdate, enddate, starttime, endtime }) }
    const allCategories = [
        "Business", "Educational", "Corporate", "Cultural", "Comedy", "Tech & Innovation", "Health & Wellness", "Sports", "Religious", "Community & Social Impact", "Agriculture & Environment"
    ]
    const types = [
        "Seminar", "Webinar", "Conference", "BootCamp", "Workshop", "Retreat", "Hackathon", "Symposium", "Campaign", "Concert"
    ]
    const handleFileChange = (e) => {
        const [file] = e.target.files
        if (file) {
            setImageFile(file)
            let reader = new FileReader()

            reader.onload = function (ev) {
                setImageUrl(ev.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories([...categories, category]);
        }
    };

    const handleDeleteCategory = (categoryToDelete) => {
        setCategories(categories.filter(category => category !== categoryToDelete));
    };

    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2 }}>
                {/* the left box */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", gap: 4, width: "45%" }}>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Title: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            size="small"
                            variant="standard"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </Box>
                    <Box sx={{ ...fieldBoxStyle, alignItems: "start" }}>
                        <Typography sx={fieldTextStyle}>Categories: </Typography>
                        <Box sx={{ ...fieldInputStyle, border: "1px solid #ccc", padding: "5px", gap: "5px", display: "flex", flexWrap: "wrap" }}>
                            {categories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onDelete={() => handleDeleteCategory(category)}
                                    deleteIcon={<DeleteIcon />}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Add Category: </Typography>
                        <Select
                            sx={fieldInputStyle}
                            size='small'
                            variant='standard'
                            value=""
                            onChange={(e) => { handleAddCategory(e.target.value) }}
                        >
                            {allCategories.map((category) => (
                                <MenuItem
                                    key={category}
                                    value={category}
                                    disabled={categories.includes(category)}
                                >
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Type: </Typography>
                        <Select
                            sx={fieldInputStyle}
                            size='small'
                            variant='standard'
                            value={type}
                            onChange={(e) => { setType(e.target.value) }}
                        >
                            {types.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Free or Paid: </Typography>
                        <FormControl sx={fieldInputStyle}>
                            <Select
                                size='small'
                                variant='standard'
                                value={isPaid}
                                onChange={(e) => { setIsPaid(e.target.value) }}
                            >
                                <MenuItem value={false}>Free</MenuItem>
                                <MenuItem value={true}>Paid</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    {isPaid &&
                        <Box sx={fieldBoxStyle}>
                            <Typography sx={fieldTextStyle}>Fee: </Typography>
                            <TextField
                                sx={fieldInputStyle}
                                id="standard-size-small"
                                size="small"
                                variant="standard"
                                value={fee}
                                onChange={(e) => { setFee(e.target.value) }}
                            />
                        </Box>}
                    <Box sx={{ ...fieldBoxStyle, alignItems: "start", justifyContent: "start" }}>
                        <Typography>Thumbnail: </Typography>
                        <label htmlFor="imageInput" className="imageLabel">
                            <FileUploadIcon />
                            upload image
                        </label>
                        <input onChange={handleFileChange} style={{ display: "none" }} id='imageInput' className='imageInput' type="file" required />

                    </Box>
                    <Box>
                        {
                            imageUrl && (
                                <img width={'100%'} style={{ maxHeight: '200px', margin: 'auto' }} src={imageUrl} alt='profile' />
                            )
                        }

                    </Box>
                </Box>
                {/* the right box */}
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", gap: 4, width: "45%" }}>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Location: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            size="small"
                            variant="standard"
                            value={location}
                            onChange={(e) => { setLocation(e.target.value) }}
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Start Date: </Typography>
                        <DatePicker
                            value={dayjs(startdate)}
                            label="Basic date picker"
                            onChange={(newdate) => { setStartdate(newdate) }}
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>End Date: </Typography>
                        <DatePicker
                            value={dayjs(enddate)}
                            label="Basic date picker"
                            onChange={(newdate) => { setEnddate(newdate) }}
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Start Time: </Typography>
                        <TimePicker
                            label="Basic time picker"
                            value={dayjs(starttime)}
                            onChange={(newtime) => { setStarttime(newtime) }}
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>End Time: </Typography>
                        <TimePicker
                            label="Basic time picker"
                            value={dayjs(endtime)}
                            onChange={(newtime) => { setEndtime(newtime) }}
                        />
                    </Box>
                    <Box sx={{ ...fieldBoxStyle, alignItems: "start" }}>
                        <Typography sx={fieldTextStyle}>Description: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            size="small"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            multiline
                            rows={4}
                            placeholder='Describe your event'
                        />
                    </Box>

                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "start", width: "45%" }}>
                <Button
                    variant='contained'
                    sx={{
                        mt: 3,
                        padding: 2.5,
                        width: "60%",
                        ml: "25%",
                        border: '1px solid #f05537',
                        color: 'black',
                        backgroundColor: 'white',
                        "&:hover": {
                            backgroundColor: '#f05537',
                            color: 'white'
                        }
                    }}

                    onClick={async () => {
                        try {
                            setIsLoading(true)
                            const event = await addEvent(title, categories, type, isPaid, fee, location, new Date(startdate), new Date(enddate), new Date(starttime), new Date(endtime), description, user.id, imageFile)
                            dispatch({ type: "ADD_EVENT", payload: event })
                            setTitle("")
                            setCategories([])
                            setType("")
                            setIsPaid(true)
                            setFee("")
                            setLocation("")
                            setStartdate(new Date())
                            setEnddate(new Date())
                            setStarttime(new Date())
                            setEndtime(new Date())
                            setDescription("")
                            setImageUrl('')
                            setImageFile(null)
                            setErrorMessage('');// clear error message
                            setIsLoading(false)
                            alert("Event created successfully")
                        }
                        catch (error) {
                            setIsLoading(false)
                            console.log(error);
                            console.log("something went wrong. Couldn't create event")
                            setErrorMessage('Check your internet connection and try again')
                        }
                    }}
                >
                    {isLoading ? <CircularProgress sx={{ color: "white" }} /> : "Create Event"}
                </Button>
            </Box>
            {errorMessage && (
                <Typography color='error' sx={{ mt: 2, ml: '25%' }}>
                    {errorMessage}
                </Typography>
            )}
        </Box>
    )
}

export default CreateEventPage
