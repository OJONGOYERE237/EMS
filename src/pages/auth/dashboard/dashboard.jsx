import React, { useEffect, useState } from 'react';
import { useEventContext } from '../../../context/eventContext';
import './dashboard.css';
import DashboardCard from '../../../components/dashboardCard';
import DashboardCard2 from './dashboardCard2';
import { convertTimestampToDate } from '../myEvents/myEventDetails';
import { useUserContext } from '../../../context/userContext';

export const getDate = (date) => {
  if (date instanceof Date) { return date }
  else { return convertTimestampToDate(date) }
}

const Dashboard = () => {
  const { state: { events: allEvents } } = useEventContext();
  const {state: {user}} = useUserContext()
  const events = allEvents.filter(event => event.userID === user.id);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [userRegistrations, setUserRegistrations] = useState(0);
  const [completedEventsCount, setCompletedEventsCount] = useState(0);
  const [ongoingEvent, setOngoingEvent] = useState(null);
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const [mostRegisteredEvent, setMostRegisteredEvent] = useState(null);

 

  useEffect(() => {
    const categories = new Set(events.flatMap(event => event.categories));
    setCategoriesCount(categories.size);

    setEventsCount(events.length);

    const completedEvents = events.filter(event => new Date(event.enddate) < new Date());
    setCompletedEventsCount(completedEvents.length);

    const ongoingEvents = events.filter(event => getDate(event.startdate) <= new Date() && getDate(event.enddate) >= new Date());
    setOngoingEvent(ongoingEvents[0]);

    const upcomingEvents = events.filter(event => getDate(event.startdate) > new Date());
    setUpcomingEvent(upcomingEvents[0]);

    const mostRegistered = events.reduce((max, event) => event.attendees?.length > max.attendees?.length ? event : max, events[0]);
    setMostRegisteredEvent(mostRegistered);

    // Assuming userRegistrations is the sum of all attended fields
    const totalRegistrations = events.reduce((sum, event) => sum + (event.attended || 0), 0);
    setUserRegistrations(totalRegistrations);
  }, [events]);

  useEffect(() => {
    console.log( ongoingEvent, upcomingEvent, mostRegisteredEvent );
  }, [ongoingEvent, upcomingEvent, mostRegisteredEvent]);

  return (
    <div>
      <div className='Dashboard'>
        <DashboardCard color={'#f90'} content={"Categories"} number={categoriesCount} />
        <DashboardCard color={"#9c2"} content={"Events"} number={eventsCount} />
        <DashboardCard color={'blue'} content={'User Registrations'} number={userRegistrations} />
        <DashboardCard color={'#0aa'} content={"Completed Events"} number={completedEventsCount} />
      </div>
      <div className='dashboardSecondPart'>
        {ongoingEvent && (
          <DashboardCard2
            Title={'On-Going'}
            title={ongoingEvent.title}
            registrations={ongoingEvent.attendees?.length}
            date={getDate(ongoingEvent.startdate)}
            Location={ongoingEvent.location}
            capacity={ongoingEvent.capacity}
            fee={ongoingEvent.isPaid? mostRegisteredEvent.fee : 'Free'}
          />
        )}
        {upcomingEvent && (
          <DashboardCard2
            Title={'Up-Coming'}
            title={upcomingEvent.title}
            registrations={upcomingEvent.attendees?.length}
            date={getDate(upcomingEvent.startdate)}
            Location={upcomingEvent.location}
            capacity={upcomingEvent.capacity}
            fee={upcomingEvent.isPaid? mostRegisteredEvent.fee : 'Free'}
          />
        )}
        {mostRegisteredEvent && (
          <DashboardCard2
            Title={'Most registered Event'}
            title={mostRegisteredEvent.title}
            registrations={mostRegisteredEvent.attendees?.length}
            date={getDate(mostRegisteredEvent.startdate)}
            Location={mostRegisteredEvent.location}
            capacity={0}
            fee={mostRegisteredEvent.isPaid? mostRegisteredEvent.fee : 'Free'}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
