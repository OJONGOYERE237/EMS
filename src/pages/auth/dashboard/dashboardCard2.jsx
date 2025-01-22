import React from 'react'

const DashboardCard2 = ({Title, title, attended, date, Location, capacity, fee}) => {
  return (
    <div>
      <div className='dashboardCard2'>
        <p className='dashboardSecondPartTitle'>{Title}</p>
        <div className='dashboardSecondPartContentContainer'>
          <div className='dashboardSecondPartContent'> <p style={{width:'50%', fontWeight:'normal', borderRadius:'4px'}}>Title:</p> <p style={{width:'50%'}}>{title}</p></div>
          <div className='dashboardSecondPartContent'> <p style={{width:'50%', fontWeight:'normal'}}>Attended:</p> <p style={{width:'50%'}}>{attended}</p></div>
          <div className='dashboardSecondPartContent'> <p style={{width:'50%', fontWeight:'normal'}}>Date:</p> <p style={{width:'50%'}}>{date}</p> </div>
          <div className='dashboardSecondPartContent'> <p style={{width:'50%', fontWeight:'normal'}}>Location:</p> <p style={{width:'50%'}}>{Location}</p></div>
          <div className='dashboardSecondPartContent'> <p style={{width:'50%', fontWeight:'normal'}}>Capacity:</p> <p style={{width:'50%'}}>{capacity}</p></div>
          <div className='dashboardSecondPartContent'> <p style={{width:'50%', fontWeight:'normal'}}>Fee:</p> <p style={{width:'50%'}}>{fee}</p> </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardCard2
