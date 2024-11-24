import React from 'react'
import '../Styles/landingPageFooter.css'
import EventSeatIcon from '@mui/icons-material/EventSeat';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

const LandingPageFooter = () => {
  return (
    <div className='landingPageFooter'>
      <div className='footerIcondiv'>
        <EventSeatIcon style={{marginRight:'10px', fontSize:'30px'}}/>
        <p style={{fontWeight:'bold',fontSize:'20px'}}>EventPro</p>
      </div>

      <div className='subFooterContainer'>
        <div className='subFooter'>
          <p className='subFooterParagraph'>Product</p>
          <p>About</p>
          <p>Team</p>
          <p>Organizers</p>
        </div>
        <div className='subFooter'>
          <p className='subFooterParagraph'>Support</p>
          <p>How it works</p>
          <p>Help Centre</p>
          <p>Trust&Safety</p>
        </div>
        <div className='subFooter'>
          <p className='subFooterParagraph'>Discover</p>
          <p>News</p>
          <p>Events</p>
          <p>Guides</p>

        </div>
        <div className='subFooter'>
          <p className='subFooterParagraph'>Resources</p>
          <p>Talent Desk</p>
          <p>Startups</p>
          <p>Organizations</p>
        </div>
      </div>
      <div>
        <LinkedInIcon style={{color:'#92a1b5'}}/>
        <FacebookIcon style={{color:'#92a1b5'}}/>
      </div>
      
    </div>
  )
}

export default LandingPageFooter

