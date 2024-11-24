import React from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import '../Styles/HeroCard.css'

const HeroCard = ({cardContent}) => {
  return (
    <div className='oneCard'>
      <AutoAwesomeIcon sx={{marginBottom: "15px", color:"#f55600"}}/>
      <p style={{margin: 0}}>{cardContent}</p>
    </div>
  )
}

export default HeroCard
