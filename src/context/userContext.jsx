import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Initial state
const initialState = { user: null };

// Create the UserContext
const UserContext = createContext();
// createcontext initializes an empty context

// Reducer to handle userentication state
const userReducer = (state, action) => { // a reducer is a function that takes two parameters, action is what updates the state. an action is an object that come with 2 properties: type(the type of operation to be done on the) and payload(the actual value the operation carries).

  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload};
    default:
      return state;
  }
};

// UserProvider component to wrap around the app
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(()=>{
    console.log (state)
  }, [state])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUserContext = () => useContext(UserContext);
