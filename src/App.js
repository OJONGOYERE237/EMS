// import logo from './logo.svg';
import { useEffect } from 'react';
import '@fontsource/inter';

import './App.css';
// import Navbar from './components/Navbar';
import SignUp from './pages/signUp';
import { BrowserRouter, Route, Routes, useNavigate, Navigate, redirect, useLocation, Router } from 'react-router-dom';
import { useAuth } from './context/authContext';
import { jwtDecode } from 'jwt-decode';
import Home from './pages/home';
import Login from './pages/login';
import Landingpage from './pages/landingpage';
import CreateEventPage from './pages/CreateEventPage';
import { useUserContext } from './context/userContext';
import Layout from './components/layout';
// import Dashboard from '@mui/icons-material/Dashboard';
import Dashboard from './pages/auth/dashboard/dashboard';
import Organizations from './pages/auth/organisations';
import Events from './pages/auth/events';
import MyEvents from './pages/auth/myEvents/myEvents';
import BrowseEventPage from './pages/browseEventPage';
import Navbar from './components/Navbarr';
import EventDetailsPage from './pages/eventDetailsPage';
import SignUpUpdate from './pages/signUpUpdate';
import LoginUpdate from './pages/LoginUpdate';
// import ProfilePage from './pages/profile/ProfilePage';
import ProfilePage from './pages/ProfilePage';



function App() {
  const { state: { isAuthenticated }, dispatch } = useAuth()
  const { dispatch: userDispatch } = useUserContext()
  console.log(isAuthenticated, "this is the state in the app.jsx return by the context")


  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("emsToken")
      console.log(token)
      if (token && token != "undefined") {
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        if (Date.now() < decodedToken.exp * 1000) {
          const user = localStorage.getItem("emsUser")// fetching user from the local storage
          userDispatch({ type: 'SET_USER', payload: JSON.parse(user) })
          dispatch({ type: 'LOGIN' })
        }
        else {
          console.log("token has expired")
          localStorage.removeItem('emsUser')
          localStorage.removeItem('emsToken')
        }
      }
    }

    checkToken()
  }, [])



  return (
    <div className="App">
      <BrowserRouter>
        {!isAuthenticated ? (
          <Routes>
            <Route path='/' element={<Navigate to='/unAuth' />} />
            <Route path='/unAuth' element={<Navbar><Landingpage /></Navbar>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUpUpdate' element={<SignUpUpdate />} />
            <Route path='/loginUpdate' element={< LoginUpdate />} />
            <Route path='/createEvent' element={<Navigate to='/unAuth' />} />
            <Route path='/browseeventpage' element={<Navbar><BrowseEventPage /></Navbar>} />
            <Route path='/eventdetailspage/:id' element={<Navbar>< EventDetailsPage /></Navbar>} />
            <Route path='*' element={<Navigate to={'/unAuth'} />} />
            
          </Routes>
        ) : (
          <Routes>
            <Route path='/auth/' element={<Layout><Dashboard /></Layout>} />
            <Route path='/auth/events' element={<Layout><Events /></Layout>} />
            <Route path='/auth/organizations' element={<Layout><Organizations /></Layout>} />
            <Route path='/auth/createEventPage' element={<Layout><CreateEventPage /></Layout>} />
            <Route path='/auth/events/my-events' element={<Layout><MyEvents /></Layout>} />
            <Route path='/profilePage' element={<Layout><ProfilePage /></Layout>} />
            <Route path='/landing' element={<Navbar><Landingpage /></Navbar>} />
            <Route path='/browseeventpage' element={<Navbar><BrowseEventPage /></Navbar>} />
            <Route path='/eventdetailspage/:id' element={<Navbar>< EventDetailsPage /></Navbar>} />
            <Route path='*' element={<Navigate to={'/auth'} />} />
          </Routes>

        )}
      </BrowserRouter>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuthenticated?<Layout />: <Navigate to='/unAuth'/>}/>
          <Route path='/unAuth' element={!isAuthenticated?<Landingpage />: <Navigate to= '/'/>}/>
          <Route path='/signup' element={!isAuthenticated?<SignUp />: <Navigate to='/'/>}/>
          <Route path='/login' element={!isAuthenticated?<Login />: <Navigate to='/'/>}/>
          <Route path='/createEvent' element = {isAuthenticated? <CreateEventPage/>: <Navigate to = '/unAuth'/>} />
        </Routes>
      </BrowserRouter> */}

    </div>
  );
}

export default App;
