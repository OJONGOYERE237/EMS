import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DashboardCard = ({ color, content, number }) => {

  return (
    <div>
      <div className='dashboardCard' style={{ backgroundColor: color, position: 'relative' }} >
        <p className='cardParagraph' style={{ margin: 0, color: 'white' }}>{number}</p>
        <p className='cardParagraph'>{content}</p>
        <div className='moreinfoCard' style={{ width: '100%', display: 'flex', alignItems: 'center', position: 'absolute', bottom: '0px', justifyContent: 'center', left: '0px', borderBottomRightRadius: '4px', borderBottomLeftRadius: '4px', backgroundColor: '#00000022', gap: '4px' }}>
          <p className='moreinfoCardParagraph' style={{ margin: '0px', color: 'white', fontWeight: "lighter" }}>More info</p>
          <ArrowForwardIcon className='moreinfoCardIcon' sx={{ backgroundColor: 'white', borderRadius: '15px', fontSize: '18px', color: color }} />
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
