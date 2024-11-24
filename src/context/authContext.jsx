import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = { isAuthenticated: false };

// Create the AuthContext
export const AuthContext = createContext();

// Reducer to handle authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// AuthProvider component to wrap around the app
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);
