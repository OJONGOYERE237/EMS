import React from 'react'
import { useState } from 'react'
import { addEvent } from '../connections/firebase'
import { UserContextProvider, useUserContext } from '../context/userContext'
import { useRevalidator } from 'react-router-dom'
import { useEventContext } from '../context/eventContext'
import { useNavigate } from 'react-router-dom'
import "../Styles/createEventPage.css"
import { TextField, Typography, Box, Select, FormControl, Button } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';

const fieldBoxStyle = { display: "flex", justifyContent: "start", alignItems: "end", gap: 1, width: "100%" }
const fieldTextStyle = { width: "25%" }
const fieldInputStyle = { width: "60%" }
const CreateEventPage = () => {
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [freepaid, setFreepaid] = useState("")
    const { state: { user } } = useUserContext()
    const { dispatch } = useEventContext()
    const navigate = useNavigate()

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
                            defaultValue=""
                            size="small"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Category: </Typography>
                        <Select
                            sx={fieldInputStyle}
                            // defaultValue={30}
                            size='small'
                            variant='standard'
                        >
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Type: </Typography>
                        <Select
                            sx={fieldInputStyle}
                            // defaultValue={30}
                            size='small'
                            variant='standard'
                        >
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </Select>
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Free or Paid: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Fee: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={{ ...fieldBoxStyle, alignItems: "start", justifyContent: "start" }}>
                        <Typography>Thumbnail: </Typography>
                        <label htmlFor="imageInput" className="imageLabel">
                            <FileUploadIcon />
                            upload image
                        </label>
                        <input style={{ display: "none" }} id='imageInput' className='imageInput' type="file" required />
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
                            defaultValue=""
                            size="small"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Date: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={fieldBoxStyle}>
                        <Typography sx={fieldTextStyle}>Time: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            variant="standard"
                        />
                    </Box>
                    <Box sx={{ ...fieldBoxStyle, alignItems: "start" }}>
                        <Typography sx={fieldTextStyle}>Description: </Typography>
                        <TextField
                            sx={fieldInputStyle}
                            id="standard-size-small"
                            defaultValue=""
                            size="small"
                            // variant="contained"
                            multiline
                            rows={4}
                            placeholder='Describe your event'
                        />
                    </Box>

                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "start", width: "45%" }}>
                <Button variant='contained' sx={{ mt: 3, padding: 2.5, width: "60%", ml: "25%" }}>Create</Button>
            </Box>
        </Box>
    )
}

export default CreateEventPage
