import React from 'react'
// import '../../../Styles/dashboard.css'
import './dashboard.css'
import DashboardCard from '../../../components/dashboardCard'
import DashboardCard2 from './dashboardCard2'

const Dashboard = () => {
  return (
    <div>
      <div className='Dashboard'>
        <DashboardCard color={'#f90'} content={"Categories"} number={"0"} />
        <DashboardCard color={"#9c2"} content={"Events"} number = {"9"} />
        <DashboardCard color={'blue'} content={'User Registrations'} number = {"45"}/>
        <DashboardCard color={'#0aa'} content={"Completed Events"} number = {"2"}/>
      </div>
      <div className='dashboardSecondPart'>
        <DashboardCard2 Title={'On-Going'} title={'Boot-Camp'} attended={"56"} date={'25-oct-24'} Location={'Buea'} capacity={'100'} fee={'10000CFA'} />
        <DashboardCard2 Title={'Up-Coming'} title={'Hackathon'} attended={"0"} date={'6-Dec-24'} Location={'Limbe'} capacity={'100'} fee={'5000CFA'} />
        <DashboardCard2 Title={'Most registered Event'} title={'Grey-Mind'} attended={"100"} date={'08-Aug-24'} Location={'Douala'} capacity={'100'} fee={'2000CFA'} />
      </div>

    </div>

  )
}

export default Dashboard
