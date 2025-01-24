import React from 'react'
import dayjs from 'dayjs';

const DashboardCard2 = ({ Title, title, registrations, date, Location, capacity, fee }) => {


  const formattedDate = dayjs(date).format('MMMM D, YYYY');

  return (
    <div>
      <div className='dashboardCard2'>
        <p className='dashboardSecondPartTitle'>{Title}</p>
        <div className='dashboardSecondPartContentContainer'>
          <div className='dashboardSecondPartContent'>
            <p style={{ width: '50%', fontWeight: 'normal', borderRadius: '4px' }}>Title:</p>
            <p style={{ width: '50%' }}>{title}</p>
          </div>
          <div className='dashboardSecondPartContent'>
            <p style={{ width: '50%', fontWeight: 'normal' }}>Registered:</p>
            <p style={{ width: '50%', color: !registrations ? "red" : 'inherit' }}>{registrations || "No registrations"}</p>
          </div>
          <div className='dashboardSecondPartContent'>
            <p style={{ width: '50%', fontWeight: 'normal' }}>Date:</p>
            <p style={{ width: '50%' }}>{formattedDate}</p>
          </div>
          <div className='dashboardSecondPartContent'>
            <p style={{ width: '50%', fontWeight: 'normal' }}>Location:</p>
            <p style={{ width: '50%' }}>{Location}</p>
          </div>
          <div className='dashboardSecondPartContent'>
            <p style={{ width: '50%', fontWeight: 'normal' }}>Capacity:</p>
            <p style={{ width: '50%' }}>{capacity}</p>
          </div>
          <div className='dashboardSecondPartContent'>
            <p style={{ width: '50%', fontWeight: 'normal' }}>Fee:</p>
            <p style={{ width: '50%' }}>{fee}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard2
