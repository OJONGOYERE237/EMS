import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Button,
  Box,
  Avatar,
  Divider,
} from '@mui/material';
import '../Styles/bepCard.css'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';


export function convertTimestampToDate(timestamp) {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds
  return new Date(milliseconds); // Create and return a JS Date object
}


const EventCard = ({ event }) => {
  const navigate = useNavigate();
  return (
    <Card
      className='bepCard'
      onClick={()=> navigate(`/eventdetailspage/${event.id}` )}
      sx={{ width: "300px", boxShadow: 3, marginTop: '40px' }}>
      {/* Image Section */}
      <CardMedia
        component="img"
        alt="Content Marketing"
        height="200"
        // image="https://picsum.photos/200/300" // Replace with actual image URL
        image= {event.imageUrl} // Replace with actual image URL
      />

      {/* Content Section */}
      <Box sx={{ px: 2, paddingTop: "10px" }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1.15rem', }}>
          {/* Engaging blog posts, web content, article with SEO for 650 Words */}
          {event.title}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2, }}>
          <Chip label={event.category} variant="outlined" size='small' />
          {/* <Chip label="creative writing" variant="outlined" size='small' />
          <Chip label="blog writing" variant="outlined" size='small'/>
          <Chip label="blog" variant="outlined" size='small'/>
          <Chip label="web content" variant="outlined" size='small' /> */}
        </Box>

        {/* Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar alt="Anchita R." src="https://picsum.photos/200/300" sx={{ width: '35px', height: '35px' }} /> {/* Replace with avatar URL */}
            <Typography variant="subtitle2">by Anchita R.</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ color: event.isPaid ? "orange" : "Green" }} >
              {/* XAF5000 */}
              {event.isPaid ? ` ${event.fee}` : "FREE"}
            </Typography>
          </Box>
        </Box>

        {/* Price and Delivery */}
        <Divider sx={{ mt: 2, }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
          <Typography sx={{ fontWeight: 'light', fontSize: 'smaller' }}>
            From: {dayjs(convertTimestampToDate(event.startdate)).format("DD-MM-YYYY")}
          </Typography>
          <Typography sx={{ fontWeight: 'light', fontSize: 'smaller' }}>
            To: {dayjs(convertTimestampToDate(event.enddate)).format("DD-MM-YYYY")}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default EventCard
