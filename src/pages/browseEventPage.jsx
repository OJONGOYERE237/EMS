import React, { useState, useEffect } from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import Navbar from '../components/Navbarr'
import '../Styles/browseEventPage.css'
import SearchComponent from '../components/SearchComponent'
import { CircularProgress, Collapse, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ViewListIcon from '@mui/icons-material/ViewList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/bEPCard';
import { fetchEvents } from '../connections/firebase';
const BrowseEventPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const getEvents = async () => {
            try {
                setIsLoading(true)
                const Events = await fetchEvents()
                setEvents(Events)
                console.log(Events)
                setIsLoading(false)
            }
            catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        getEvents()

    }, [])
    const [sortVar, setSortVar] = useState(false);
    const sortItems = ["Relevance", "Recommended", "Trending", "Popularity", "Low to High", "High to Low"
    ]
    const [filterOpen, setFilterOpen] = useState(false);

    const handleFilterListClick = () => {
        setFilterOpen(!filterOpen);
    };
    const [filter2Open, setFilter2Open] = useState(false);

    const handleFilter2ListClick = () => {
        setFilter2Open(!filter2Open);
    }
    const filter = [
        {
            text: "Recents",
            openState: filterOpen,
            openFunc: handleFilterListClick,
            subList: [
                {
                    text: "Tomorrow",
                    icon: <ContactsIcon sx={{ fontSize: "18px" }} />,
                },
                {
                    text: "In 2 days",
                    icon: <ViewListIcon sx={{ fontSize: "18px" }} />,
                },
                {
                    text: 'Within the week',
                    icon: <ViewListIcon />
                },
            ]
        },

        {
            text: "Category",
            openState: filter2Open,
            openFunc: handleFilter2ListClick,
            subList: [
                {
                    text: "Business",
                    icon: <ContactsIcon sx={{ fontSize: "18px" }} />,
                },
                {
                    text: "Religious",
                    icon: <ViewListIcon sx={{ fontSize: "18px" }} />,
                },
                {
                    text: 'Health & Wellness',
                    icon: <ViewListIcon />
                },
                {
                    text: 'Agriculture',
                    icon: <ViewListIcon />
                },
                {
                    text: 'Bamenda',
                    icon: <ViewListIcon />
                },

            ]
        },
    ]

    const navigate = useNavigate()


    const filter2 = [
        {
            text: "Location",
            openState: filterOpen,
            openFunc: handleFilterListClick,
        },
    ]
    return (
        <div>
            <div className='browseEventPage'>
                <div className='browseEventHeader'>
                    <p className='headerParagraph'>Find Your Dream Events here!</p>
                    <p className = 'headerParagraph2'>Looking for Events that match your interest? Eventings has you covered.</p>
                    <SearchComponent boxWidth={'450px'} iconButtonWidth={'70px'} borderRadius={'15px'} buttonIsHalf={true} justifySelf={'center'} inputWidth={'330px'} />
                </div>
                <div className='bEPline'>

                </div>
                <div className='browseEventBody'>
                    <div className='bEPfilter'>
                        <p style={{ padding: '15px 0px 0px 25px', fontWeight: 'bold', marginBottom: '0px' }}>Filters</p>
                        <List>
                            {filter.map(({ text, icon, openFunc, openState, subList, openFunc2 }) => (
                                <ListItem sx={{ padding: '0px' }} key={text} >
                                    <Box sx={{ width: "100%" }}>
                                        <ListItemButton onClick={openFunc} sx={{ borderRadius: "7px", paddingLeft: '25px', color: '#6c6f7e', fontWeight: 'bolder' }}>
                                            <ListItemText primary={text} sx={{ fontWeight: 'bold' }} />
                                            {openState ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openState} timeout="auto" unmountOnExit>
                                            <List sx={{ paddingLeft: '20px' }} component="div" disablePadding>
                                                {subList.map(({ text, icon, path }) => (
                                                    <ListItemButton key={text} sx={{ my: '15px', borderRadius: "7px", padding: '0px 10px' }} onClick={() => { navigate(path) }}>
                                                        <ListItemIcon>
                                                            {icon}
                                                        </ListItemIcon>
                                                        <ListItemText primary={text} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>

                    </div>

                    <div className='searchResults'>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormControl className='formControl' sx={{ width: "200px" }}>
                                <InputLabel className='formControl' id="demo-simple-select-label">Sort by</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortVar}
                                    label="Sort by"
                                    onChange={(event) => {
                                        setSortVar(event.target.value);
                                    }}
                                >
                                    {sortItems.map((sortItem) => (
                                        <MenuItem key={sortItem} value={sortItem}>{sortItem}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Typography sx={{ alignSelf: 'end', color: 'grey', fontWeight: 'light' }}>300+ results</Typography>
                        </Box>
                        <div className='isLoadingDiv'>
                            {isLoading ?
                                <CircularProgress /> :
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                                    {events.map((event) => (
                                        <EventCard event={event} />
                                    ))}
                                </div>
                            }
                        </div>
                    </div>


                </div>
            </div>

        </div>

        // how to change the background color of the whole page.
        // #f5f7fa - background color i want to use.
    );

}
export default BrowseEventPage