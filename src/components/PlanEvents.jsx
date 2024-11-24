import React from 'react'
import easyevents from '../Assets/images/easyevents.jpg'
import '../Styles/planEvents.css'
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PlanEvents = () => {
  return (
    <div style={{ marginTop: "150px", marginBottom:'100px', display: 'flex', padding: '0px 70px', height:'475px', alignItems:'start', backgroundColor:'#F6F8FA', paddingTop:'75px' }}>
      <div className='planEventsParagraph'>
        <h2 style={{marginBottom:'30px' ,fontSize: '50px', paddingTop: 'none', lineHeight: '3rem', color: '#2A0959', fontFamily:'Poppins' }}>Planning Events has never been easier!</h2>
        <div style={{display:'flex'}}>
          <CheckCircleIcon sx={{color:'#44B098', backgroundColor:'white'}}/>
          <p style={{marginLeft:'10px', fontFamily:'Montserrat', fontSize:'20px'}}>Plan and manage your events constructively </p>
        </div>
        <div style={{display:'flex'}}>
          <CheckCircleIcon sx={{color:'#44B098', backgroundColor:'white'}}/>
          <p style={{marginLeft:'10px', fontFamily:'Montserrat', fontSize:'20px'}}>Register for any event anywhere</p>
        </div>
        <div style={{display:'flex'}}>
          <CheckCircleIcon sx={{color:'#44B098', backgroundColor:'white'}}/>
          <p style={{marginLeft:'10px', fontFamily:'Montserrat', fontSize:'20px'}}>Grow your network and engagements</p>
        </div>
        <button className='planEventsButton'>
          START NOW FOR FREE
        </button>
      </div>
      <div className='planEventsdiv' style={{ display: 'flex', alignItems: 'start' }}>
        <img className='planEventsImage' src={easyevents} alt="Plan Events easily" />
      </div>
    </div>
  )
}

export default PlanEvents
