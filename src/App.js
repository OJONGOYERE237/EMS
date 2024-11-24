// import logo from './logo.svg';
import { useEffect } from 'react';
import '@fontsource/inter';

import './App.css';
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
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
import Dashboard from './pages/auth/dashboard';
import Organizations from './pages/auth/organisations';
import Events from './pages/auth/events';



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
            <Route path='/unAuth' element={<Landingpage />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createEvent' element={<Navigate to='/unAuth' />} />
          </Routes>
        ) : (
          <Layout>
            <Routes>
              <Route path='/' element={<Navigate to={'/dashboard'} />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/events' element={<Events />} />
              <Route path='/organizations' element={<Organizations />} />
              <Route path='/createEventPage' element = {<CreateEventPage/>} />
              <Route path='*' element={<Navigate to={'/dashboard'}/>} />
            </Routes>
          </Layout>
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
