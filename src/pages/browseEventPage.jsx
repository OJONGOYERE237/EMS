import React, { useState, useEffect } from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import Navbar from '../components/Navbarr';
import '../Styles/browseEventPage.css';
import SearchComponent from '../components/SearchComponent';
import { CircularProgress, Collapse, Tooltip, Typography } from '@mui/material';
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
import { useNavigate, useParams } from 'react-router-dom';
import EventCard from '../components/bEPCard';
import { useEventContext } from '../context/eventContext';
import { getDate as getEventDate } from './auth/dashboard/dashboard';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const BrowseEventPage = () => {
    const { sentCat } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const { state: { events } } = useEventContext();
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [sortVar, setSortVar] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter2Open, setFilter2Open] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [search, setSearch] = useState('');



    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedDate('');
    };
    const categories = [
        "Business", "Educational",
        "Corporate", "Cultural", "Comedy",
        "Tech & Innovation", "Health & Wellness",
        "Sports", "Religious", "Community & Social Impact",
        "Agriculture & Environment"
    ]

    useEffect(() => {
        if (sentCat && categories.includes(sentCat)) {
            setSelectedCategory(sentCat)
        }
    }, [sentCat])
    
    const sortItems = ["Relevance", "Recommended", "Trending", "Popularity", "Low to High", "High to Low"];

    const handleFilterListClick = () => {
        setFilterOpen(!filterOpen);
    };

    const handleFilter2ListClick = () => {
        setFilter2Open(!filter2Open);
    };

    const FilterToggle = () => {
        if (selectedCategory || selectedDate)
            return (
                <>
                    <Tooltip title="Clear filters">
                        <IconButton onClick={clearFilters} sx={{ marginLeft: 'auto' }}>
                            <FilterAltOffIcon />
                        </IconButton>
                    </Tooltip>
                </>
            );
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
                    value: 'tomorrow'
                },
                {
                    text: "In 2 days",
                    icon: <ViewListIcon sx={{ fontSize: "18px" }} />,
                    value: 'in2days'
                },
                {
                    text: 'Within the week',
                    icon: <ViewListIcon />,
                    value: 'week'
                },
            ]
        },
        {
            text: "Category",
            openState: filter2Open,
            openFunc: handleFilter2ListClick,
            subList: categories.map((category) => ({
                text: category,
                icon: <ViewListIcon sx={{ fontSize: "18px" }} />,
                value: category
            }))
        },
    ];

    const navigate = useNavigate();

    useEffect(() => {
        let filtered = events;

        if (selectedCategory) {
            filtered = filtered.filter(event => event.categories.includes(selectedCategory));
        }

        if (selectedDate) {
            const today = new Date();
            if (selectedDate === 'tomorrow') {
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                filtered = filtered.filter(event => getEventDate(event.startdate).toDateString() === tomorrow.toDateString());
            } else if (selectedDate === 'in2days') {
                const in2days = new Date(today);
                in2days.setDate(today.getDate() + 2);
                filtered = filtered.filter(event => getEventDate(event.startdate).toDateString() === in2days.toDateString());
            } else if (selectedDate === 'week') {
                const endOfWeek = new Date(today);
                endOfWeek.setDate(today.getDate() + 7);
                filtered = filtered.filter(event => getEventDate(event.startdate) <= endOfWeek);
            }
        }

        if (search) {
            filtered = filtered.filter(event => event.title.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredEvents(filtered);
    }, [events, selectedCategory, selectedDate, search]);

    return (
        <div>
            <div className='browseEventPage'>
                <div className='browseEventHeader'>
                    <p className='headerParagraph'>Find Your Dream Events here!</p>
                    <p className='headerParagraph2'>Looking for Events that match your interest? Eventings has you covered.</p>
                    <SearchComponent
                        styles={{
                            borderRadius: '15px', inputWidth: '330px',
                            iconButtonWidth: '70px', boxWidth: '450px',
                            buttonIsHalf: true, justifySelf: 'center'
                        }}
                        searchText={search}
                        setSearchText={setSearch}
                    />
                </div>
                <div className='bEPline'></div>
                <div className='browseEventBody'>
                    <div className='bEPfilter'>
                        <div style={{ padding: '15px 0px 0px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontWeight: 'bold', marginBottom: '0px' }}>Filters</p>
                            <FilterToggle />
                        </div>
                        <List>
                            {filter.map(({ text, icon, openFunc, openState, subList }) => (
                                <ListItem sx={{ padding: '0px' }} key={text}>
                                    <Box sx={{ width: "100%" }}>
                                        <ListItemButton onClick={openFunc} sx={{ borderRadius: "7px", paddingLeft: '25px', color: '#6c6f7e', fontWeight: 'bolder' }}>
                                            <ListItemText primary={text} sx={{ fontWeight: 'bold' }} />
                                            {openState ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openState} timeout="auto" unmountOnExit>
                                            <List sx={{ paddingLeft: '20px', maxHeight: '200px', overflowY: 'auto' }} component="div" disablePadding>
                                                {subList.map(({ text, icon, value }) => (
                                                    <ListItemButton key={text} sx={{ my: '15px', borderRadius: "7px", padding: '0px 10px' }}
                                                        onClick={() => {
                                                            if (categories.includes(text)) {
                                                                setSelectedCategory(value);
                                                            } else {
                                                                setSelectedDate(value);
                                                            }
                                                        }}>
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
                            <Typography sx={{ alignSelf: 'end', color: 'grey', fontWeight: 'light' }}>{filteredEvents.length} results</Typography>
                        </Box>
                        <div className='isLoadingDiv'>
                            {isLoading ? (
                                <CircularProgress />
                            ) : (
                                <div style={{
                                    display: 'flex', flexWrap: 'wrap', gap: '24px',
                                    ...filteredEvents.length === 0 && { justifyContent: 'center', alignItems: 'center', height: '100%' }
                                }}>
                                    {filteredEvents.length === 0 ? (
                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                            <ContactsIcon sx={{ fontSize: '100px', color: 'grey' }} />
                                            <Typography sx={{ color: 'grey', fontWeight: 'light', mt: 3 }}>{`No ${selectedCategory} events found`}</Typography>
                                        </div>
                                    ) : (
                                        filteredEvents.map((event) => (
                                            <EventCard key={event.id} event={event} />
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseEventPage;