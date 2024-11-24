import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { fetchEvents } from '../connections/firebase';

// Initial state
const initialState = { events: [] };

// Create the EventContext
const EventContext = createContext();
// createcontext initializes an empty context

// Reducer to handle evententication state
const eventReducer = (state, action) => { // a reducer is a function that takes two parameters, action is what updates the state. an action is an object that come with 2 properties: type(the type of operation to be done on the) and payload(the actual value the operation carries).

  switch (action.type) {
    case 'ADD_EVENT':
      return { events: [...state.events, action.payload]};
    case 'SET_EVENTS':
      return {events:  action.payload}
    default:
      return state;
  }
};

// EventProvider component to wrap around the app
export const EventContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  useEffect(()=>{
    const getAllEvents = async () =>{
    const events = await fetchEvents()
    console.log ("events in the event context", events)
    dispatch ({type: 'SET_EVENTS', payload: events})
    }
    getAllEvents()
},[])

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook for using the event context
export const useEventContext = () => useContext(EventContext);
