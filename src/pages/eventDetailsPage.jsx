import React, { useEffect, useState } from 'react'
import '../Styles/eventDetails.css'
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useParams } from 'react-router-dom';
import { useEventContext } from '../context/eventContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs'
import EventDetailsCard from '../components/EventDetailsCard';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useUserContext } from '../context/userContext';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { fetchUser, firestore } from '../connections/firebase';
import { CircularProgress } from '@mui/material';


const cardImage1 = require('../Assets/images/Background1.jpg')
const cardImage2 = require('../Assets/images/Background2.jpg')
const cardImage3 = require('../Assets/images/Background3.jpg')


const EventDetailsPage = () => {

  const { state: { user } } = useUserContext();
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(false);
  const { state: { events } } = useEventContext();
  const [organizer, setOrganizer] = useState(null)
  const event = events.find((evt) => evt.id === id);

  console.log(event);
  const getEventCreator = async () => {
    if (event) {
      try {
        const creator = await fetchUser(event.userID)
        setOrganizer(creator)
      } catch (error) {
        console.log("Couldn't fetch event organizer")
      }
    }
  }

  useEffect(() => {
    getEventCreator()
  }, [event])


  const consider = [
    {
      title: "Write you a 500-word, SEO-friendly article",
      price: "$65",
      organizer: "Naomi V.",
      image: cardImage1,
    },
    {
      title: "Write a human-written blog article or ...",
      price: "$55",
      organizer: "Temitope A.",
      image: cardImage2
    },
    {
      title: "Unique & engaging blog, web content or ...",
      price: "$365",
      organizer: "V T.",
      image: cardImage3
    },
  ];

  function convertTimestampToDate(timestamp) {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return new Date(milliseconds);
  }

  const location_Date = [
    {
      text: "Location: ",
      icon: <LocationOnIcon sx={{ color: 'blue' }} />,
      value: event.location
    },
    {
      text: "Date:",
      icon: <ScheduleIcon sx={{ color: 'blue' }} />,
      value: dayjs(convertTimestampToDate(event.startdate)).format("DD-MM-YYYY")
    },
    {
      text: "Time:",
      icon: <MyLocationIcon sx={{ color: 'blue' }} />,
      value: dayjs(convertTimestampToDate(event.starttime)).format("HH:MM")
    },

  ]




  const handleRegister = async () => {
    if (user.id === event.userID) {
      alert("You cannot register for your own event.");
      return;
    }
    if(!user){
      alert("You need to have an account to register for an event.");
      return;
    }
    setIsLoading(true)
    try {
      const eventRef = doc(firestore, "event", event.id);
      await updateDoc(eventRef, {
        attendees: arrayUnion(user.id)
      });
      setIsLoading(false)
      alert("Registration successful!");
    } catch (error) {
      setIsLoading(false)
      alert("Error registering for event: " + error.message);
    }
  };

  if (event)
    return (
      <div className='eventDetailsPage'>
        <div className='eventDetails1'>
          <div className='eventTitleDiv'>
            <h1>{event.title}</h1>
          </div>
          <div className='imgDiv'>
            <img className='eventDetailsImage' src={event.imageUrl} alt="Event Photo" />
          </div>
          <Divider sx={{ margin: '50px 0px 30px 0px', width: '98%', padding: '0px 0px', justifySelf: 'center' }} />
          <div className='descriptionDiv'>
            <h3>What You Need To Know</h3>
            <p className='descriptionParagraph'>
              {event.description}
            </p>
          </div>

        </div>
        <div className='eventDetails2'>
          <div className='organizerInformation'>
            <Avatar alt={organizer?.username || "Event Creator"} src={organizer?.profileUrl || "https://picsum.photos/200/300"} sx={{ width: '70px', height: '70px' }} />
            <div className='organizerNameSkills'>
              <h4 className='organizerName'>{organizer?.username || "Creator Name"}</h4>
              <p className='organizerSkills'>{organizer?.bio || "..."} </p>
            </div>
          </div>
          <div className='censusDiv'>
            <span>VIEWS</span> <span className='census'>50</span>
            <span>REGISTERED</span> <span className='census'>19</span>
            <FavoriteIcon sx={{ color: "#c6c7ca", fontSize: '20px', justifySelf: 'end', marginRight: '5px', marginLeft: '44px' }} />
            <span>280</span>
          </div>
          <div className='pricingAndRegistrationBox'>
            <div className='priceDiv'>
              <p className='price'>
                {event.isPaid ? ` XAF ${event.fee}` : "FREE"}
              </p>
            </div>
            {user?.id !== event.userID &&
              <button
                className='registerButton'
                onClick={handleRegister}>
                {isLoading ? <CircularProgress sx={{ color: "white" }} /> : " REGISTER NOW"}
              </button>}
            <button className='deadlineButton'>
              Deadline: {dayjs(convertTimestampToDate(event.enddate)).format("DD-MM-YYYY")}
            </button>
          </div>
          <div className='detailsTable'>
            <div className='mainLocationDiv'>
              {location_Date.map(({ text, icon, value }) => (
                <div className='locationDiv'>
                  <span className='detailIcon'>
                    {icon}
                  </span>
                  {/* <span className='detailText'>
                    {text}
                  </span> */}
                  <p className='value'>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <PanoramaFishEyeIcon sx={{ color: '#ff831d', paddingRight: '7px' }} />
              <p className='considerParagraph'>CONSIDER ALSO</p>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: '20px' }}>
              {consider.map((item, index) => (
                <EventDetailsCard key={index} item={item} />
              ))}
            </div>

          </div>
        </div>
      </div>
    )
}

export default EventDetailsPage
