import React from 'react'
import { useState } from 'react'
import { addEvent } from '../connections/firebase'
import { UserContextProvider, useUserContext } from '../context/userContext'
import { useRevalidator } from 'react-router-dom'
import { useEventContext } from '../context/eventContext'
import { useNavigate } from 'react-router-dom'
import "../Styles/createEventPage.css"
import { TextField, Typography, Box, Select, FormControl, Button, MenuItem } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs'

const fieldBoxStyle = { display: "flex", justifyContent: "start", alignItems: "end", gap: 1, width: "100%" }
const fieldTextStyle = { width: "25%" }
const fieldInputStyle = { width: "60%" }
const CreateEventPage = () => {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [isPaid, setIsPaid] = useState(true)
    const [fee, setFee] = useState("")
    const [location, setLocation] = useState("")
    const [startdate, setStartdate] = useState(new Date())
    const [enddate, setEnddate] = useState(new Date())
    const [starttime, setStarttime] = useState(new Date())
    const [endtime, setEndtime] = useState(new Date())
    const [imageFile, setImageFile] = useState(null)
    // const [date, setDate] = useState("")
    // const [time, setTime] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState('')
    const { state: { user } } = useUserContext()
    const { dispatch } = useEventContext()
    const navigate = useNavigate()
    const createEvent = () => { console.log({ title, category, type, isPaid, fee, location, description, startdate, enddate, starttime, endtime }) }
    const categories = [
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
                // setChangedEventImage(true)
            }
            reader.readAsDataURL(file)
        }
    }

    // const {dispatch} = useAuth()
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
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Category: </Typography>
                        <Select
                            sx={fieldInputStyle}
                            // defaultValue={30}
                            size='small'
                            variant='standard'
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                        >
                            {categories.map((category) => ( // to return just a line of code we don't need to have the curly braces
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Type: </Typography>
                        <Select
                            sx={fieldInputStyle}
                            // defaultValue={30}
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
                                // defaultValue={30}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                    {/* <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Title: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                        />
                    </Box> */}
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
                        {/* <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                            value={date}
                            onChange={(e) => { setDate(e.target.value) }}
                        /> */}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>End Date: </Typography>
                        <DatePicker
                            value={dayjs(enddate)}
                            label="Basic date picker"
                            onChange={(newdate) => { setEnddate(newdate) }}
                        />
                        {/* <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                            value={date}
                            onChange={(e) => { setDate(e.target.value) }}
                        /> */}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Start Time: </Typography>
                        <TimePicker
                            label="Basic time picker"
                            value={dayjs(starttime)}
                            onChange={(newtime) => { setStarttime(newtime) }}
                        />
                        {/* <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                            value={time}
                            onChange={(e) => { setTime(e.target.value) }}
                        /> */}
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>End Time </Typography>
                        <TimePicker
                            label="Basic time picker"
                            value={dayjs(endtime)}
                            onChange={(newtime) => { setEndtime(newtime) }}
                        />
                        {/* <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                            value={time}
                            onChange={(e) => { setTime(e.target.value) }}
                        /> */}
                    </Box>
                    <Box sx={{ ...fieldBoxStyle, alignItems: "start" }}>
                        <Typography sx={fieldTextStyle}>Description: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            size="small"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            // variant="contained"
                            multiline
                            rows={4}
                            placeholder='Describe your event'
                        />
                    </Box>

                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "start", width: "45%" }}>
                <Button variant='contained' sx={{ mt: 3, padding: 2.5, width: "60%", ml: "25%" }}

                    onClick={async () => {
                        try {
                            const event = await addEvent(title, category, type, isPaid, fee, location, startdate, enddate, starttime, endtime, description, user.id, imageFile)
                            dispatch({ type: "ADD_EVENT", payload: event })
                        }
                        catch (error) {
                            console.log(error)
                        }
                    }}>
                    Create
                </Button>
            </Box>
        </Box>
    )
}

export default CreateEventPage
