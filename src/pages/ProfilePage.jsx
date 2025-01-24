import React, { useState, useEffect } from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Box, Card, Typography, Breadcrumbs, Tabs, Link, Tab, Stack, Divider, IconButton, Button, FormHelperText, CardActions, FormLabel, MenuItem, FormControl, Select, TextField, CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import { useUserContext } from '../context/userContext';
import { firestore, handleProfileImageUpload } from '../connections/firebase';
import { setDoc, doc } from 'firebase/firestore';

const eventCategories = ["Business", "Educational", "Corporate", "Cultural", "Comedy", "Tech & Innovation", "Health & Wellness", "Sports", "Religious", "Community & Social Impact", "Agriculture & Environment"]
const profilePhoto = require('../Assets/images/images-removebg-preview.png')




export default function ProfilePage() {
  const [sortVar, setSortVar] = useState(false);
  const [bioEdit, setBioEdit] = useState(false)
  const [interestEdit, setInterestEdit] = useState(false)
  const [infoEdit, setInfoEdit] = useState(false)
  const { state: { user }, dispatch } = useUserContext()
  const [bio, setBio] = useState(user ? user.bio : "")
  const [name, setName] = useState(user ? user.username : "")
  const [email, setEmail] = useState(user ? user.email : "")
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "")
  const [imageUrl, setImageUrl] = useState(user ? user.profileUrl : "")
  const [imageFile, setImageFile] = useState(null)
  const [userInfoLoading, setUserInfoLoading] = useState(false)
  const [bioLoading, setBioLoading] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);
  const [interests, setInterests] = useState(user ? user.interests ? user.interests : [] : [])
  const [isLoading, setIsLoading]= useState(true)

  const resetUserInfo = () => {
    if (user) {
      setName(user.username)
      setPhoneNumber(user.phoneNumber)
      setEmail(user.email)
    }
  }

  const updateUserInfo = async () => {
    if (!user) return;
    // console.log("in the user info update function", user)
    try {
      setUserInfoLoading(true)
      let profileUrl = '';
      if(imageFile) {
        profileUrl = await handleProfileImageUpload(imageFile)
      }  
      const userRef = doc(firestore, "user", user.id);
      await setDoc(userRef, { username: name, phoneNumber, ...(profileUrl) && {profileUrl} }, { merge: true });
      dispatch({ type: 'SET_USER', payload: { ...user, username: name, phoneNumber, email, profileUrl } });
      console.log("User info updated successfully");
      setUserInfoLoading(false)
      setInfoEdit(false)
    } catch (error) {
      setUserInfoLoading(false)
      console.error("Error updating user info: ", error);
    }
  };

  const updateUserBio = async () => {
    if (!user) return;
    try {
      setBioLoading(true)
      const userRef = doc(firestore, "user", user.id);
      await setDoc(userRef, { bio }, { merge: true });
      dispatch({ type: 'SET_USER', payload: { ...user, bio } });
      console.log("User bio updated successfully");
      setBioLoading(false)
      setBioEdit(false)
    } catch (error) {
      setBioLoading(false)
      console.error("Error updating user bio: ", error);
    }
  };

  const updateUserInterests = async () => {
    if (!user) return;
    try {
      setInterestLoading(true)
      const userRef = doc(firestore, "user", user.id);
      await setDoc(userRef, { interests }, { merge: true });
      dispatch({ type: 'SET_USER', payload: { ...user, interests } });
      console.log("User interests updated successfully");
      setInterestLoading(false)
      setInterestEdit(false)
    } catch (error) {
      setInterestLoading(false)
      console.error("Error updating user interests: ", error);
    }
  };
  // console.log("this is the user in the user profile page", user)


  const handleDelete = (interest) => {
    setInterests(interests.filter((item) => item != interest))
  };

  const handleCategorySelect = (event) => {
    const value = event.target.value;
    if (!interests.includes(value)) {
      setInterests([...interests, value]);
    }
    setSortVar(value);
    console.log(value);
  };


  useEffect(() => {
    console.log(bioEdit)
  }, [bioEdit])
  useEffect(() => {
    console.log(interestEdit)
  }, [interestEdit])

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

  return (
    <Box sx={{ flex: 1, width: '100%' }}>

      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card sx={{ p: 2 }}>
          <Box sx={{ mb: 1, position: 'relative' }}>
            <Typography variant='h5'>Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the networks.
            </Typography>
            {!infoEdit && <IconButton
              aria-label="upload new picture"
              size="small"
              variant="outlined"
              color="neutral"
              sx={{
                width: '40px',
                height: '40px',
                bgcolor: 'white',
                position: 'absolute',
                zIndex: 2,
                borderRadius: '50%',
                right: 10,
                top: 7,
                boxShadow: 1,
                // display: bioEdit ? "none" : "block"
              }}
              onClick={() => setInfoEdit(!infoEdit)}
            >
              <EditRoundedIcon />
            </IconButton>}
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={10}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1} sx={{ position: "relative", borderRadius: '100%', height: "250px", width: "200px" }}>
              <Box
                sx={{ flex: 1, height: "250px", width: "250px", borderRadius: '100%', }}
              >
                <img
                  src={imageUrl ? imageUrl : profilePhoto}
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                  style={{ borderRadius: "125px", objectFit: "cover", width: '100%', height: '100%', objectPosition: "center" }}
                />
              </Box>
              <input onChange={handleFileChange} style={{ display: "none" }} id='imageInput' className='imageInput' type="file" required />
              { infoEdit && <Box
                component={'label'}
                htmlFor='imageInput'
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 210,
                  top: 170,
                  width: '40px',
                  height: '40px',
                  bgcolor: 'white',
                  boxShadow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 3,
                    backgroundColor: "#aabbdd"
                  }
                }}
              >
                {/* <IconButton
                  aria-label="upload new picture"
                  size="small"
                  variant="outlined"
                  color="neutral"
                  sx={{
                  
                  }}
                > */}
                <EditRoundedIcon />
                {/* </IconButton> */}
              </Box>}
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack direction="column" spacing={2} justifyItems="center" sx={{ pt: 4, position: 'relative' }}>
                <FormControl
                  sx={{ flexDirection: { sm: 'column' }, }}
                >
                  <FormLabel>Name</FormLabel>
                  {!infoEdit ?
                    <Typography >{name}</Typography> :
                    <TextField
                      size="small" placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  }
                </FormControl>

                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  {!infoEdit ? <Typography>{phoneNumber}</Typography> :
                   <TextField size="small" 
                   value={phoneNumber} 
                   onChange={(e) => setPhoneNumber(e.target.value)} 
                   placeholder='e.g 677221166'
                   />
                   }
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Typography>{email}</Typography> 
                    {/* <TextField
                      size="small"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      startDecorator={<EmailRoundedIcon />}
                      placeholder="e.g yourname@gmail.com"
                      sx={{ flexGrow: 1 }}
                    /> */}
                </FormControl>
              </Stack>

            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <Box
                  sx={{ flex: 1, maxHeight: 108, minWidth: 108, borderRadius: '100%' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </Box>
                <IconButton
                  aria-label="upload new picture"
                  size="small"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: 'background.body',
                    position: 'absolute',
                    zIndex: 2,
                    borderRadius: '50%',
                    left: 85,
                    top: 180,
                    boxShadow: 'sm',
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Typography size="small" placeholder="First name" />
                  <Typography size="small" placeholder="Last name" />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Typography size="small" defaultValue="UI Developer" />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Typography
                size="small"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                defaultValue="siriwatk@test.com"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>

          </Stack>
          {infoEdit && <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="small" variant="outlined" color="neutral" onClick={() => {
              resetUserInfo()
              setInfoEdit(false)
            }} >
              Cancel
            </Button>
            <Button size="small" variant="contained"
              color='success' onClick={() => updateUserInfo()}
            >
              {userInfoLoading ? <CircularProgress  sx={{color: "white"}}/> : "Save"}
            </Button>
          </CardActions>}
        </Card>
        <Card sx={{ p: 2 }}>
          <Box sx={{ mb: 1, position: 'relative' }}>
            <Typography variant='h5'>Bio</Typography>
            {!bioEdit ? <Typography level="body-sm">
              Your description
            </Typography> :
              <Typography level="body-sm">
                Write a short introduction to be displayed on your profile
              </Typography>
            }
            {!bioEdit && <IconButton
              aria-label="upload new picture"
              size="small"
              variant="outlined"
              color="neutral"
              sx={{
                width: '40px',
                height: '40px',
                bgcolor: 'white',
                position: 'absolute',
                zIndex: 2,
                borderRadius: '50%',
                right: 10,
                top: 5,
                boxShadow: 1,
                // display: bioEdit ? "none" : "block"
              }}
              onClick={() => setBioEdit(!bioEdit)}
            >
              <EditRoundedIcon />
            </IconButton>}
          </Box>
          {bio && <Divider />}
          <Stack spacing={2} sx={{ my: 1 }}>
            {bioEdit ?
              <TextField
                size="large"
                multiline
                minRows={4}
                sx={{ mt: 1.5 }}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="e.g. I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
              /> :
              <Typography>{bio}</Typography>
            }
          </Stack>
          {bioEdit && <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="small" variant="outlined" color="neutral" onClick={() => {
              setBioEdit(false)
            }}>
              Cancel
            </Button>
            <Button size="small" variant="contained"
              color='success' onClick={updateUserBio}
            >
              {bioLoading ? <CircularProgress sx={{color: "white"}}/> : "Save"}
            </Button>
          </CardActions>}
        </Card>
        <Card sx={{ p: 2 }}>
          <Box sx={{ mb: 1, position: 'relative' }}>
            <Typography variant='h5'>Interests</Typography>
            {!interestEdit ? <Typography level="body-sm">
              Event Categories you're interested in
            </Typography> :
              <Typography level="body-sm">
                Choose event categories you are interested in
              </Typography>
            }
            {!interestEdit && <IconButton
              aria-label="upload new picture"
              size="small"
              variant="outlined"
              color="neutral"
              sx={{
                width: '40px',
                height: '40px',
                bgcolor: 'white',
                position: 'absolute',
                zIndex: 2,
                borderRadius: '50%',
                right: 10,
                top: 5,
                boxShadow: 1,
                // display: bioEdit ? "none" : "block"
              }}
              onClick={() => setInterestEdit(!interestEdit)}
            >
              <EditRoundedIcon />
            </IconButton>}
          </Box>
          <Divider />
          {interestEdit && <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', marginBottom: '15px' }}>
            <FormControl className='formControl' sx={{ width: "200px" }}>
              <InputLabel className='formControl' id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortVar}
                label="Sort by"
                onChange={handleCategorySelect}
                size='small'
              >
                {eventCategories.map((eventCategory) => (
                  <MenuItem key={eventCategory} value={eventCategory}>{eventCategory}</MenuItem>

                ))}
              </Select>
            </FormControl>
          </Box>}
          {<Stack direction="row" flexWrap='wrap' gap={1}>
            {interests.map((interest) => {
              if (interestEdit) {
                return <Chip
                  label={interest}
                  variant="outlined"
                  onDelete={() => handleDelete(interest)}
                  sx={{
                    marginBottom: "10px",
                    lineHeight: '1.5rem'
                  }}
                />
              } else {
                return <Chip
                  label={interest}
                  sx={{
                    marginBottom: "10px",
                    lineHeight: '1.5rem',
                    marginTop: '20px'
                  }}
                />
              }
            })}

          </Stack>}
          {interestEdit && <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="small" variant="outlined" color="neutral" onClick={() => {
              setInterestEdit(false)
            }}>
              Cancel
            </Button>
            <Button size="small" variant="contained"
              color='success' onClick={updateUserInterests}>
              {interestLoading ? <CircularProgress  sx={{color: "white"}}/> : "Save"}
            </Button>
          </CardActions>}
        </Card>

      </Stack>
    </Box>
  );
}