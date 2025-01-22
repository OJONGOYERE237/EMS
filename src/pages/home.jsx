import React from 'react';
import '../Styles/Navbar.css'
import '../Styles/home.css'
import { Link } from 'react-router-dom';
import mig from '../Assets/images/Background2.jpg'
import { useAuth } from '../context/authContext'
import { useState } from 'react';
import Hero from '../components/hero';
import { useUserContext } from '../context/userContext';
import { useEventContext } from '../context/eventContext';


const Home = () => {
    const { dispatch } = useAuth()
    const logout = () => {
        localStorage.removeItem("emsToken")
        dispatch({ type: "LOGOUT" })

    }
    const {state: {user}}= useUserContext()
    // const [events, setEvents] = useState([
    //     { title: 'Seminar', image: {mig} , organizer: 'Landmark', id: 1 },
    //     { title: 'Conference', image: 'lorem ipsum', organizer: 'Uba', id: 2 },
    //     { title : 'Bootcamp', image: 'lorem ipsum', organizer: 'Afrovision', id: 3 },

    // ])
    const {state: {events}}= useEventContext()
    console.log("events in the home page", events)
    return (
        <div>
            {/* <Navbar/>
            <Hero 
            image={mig}
            heading={`Welcome ${user.username}`}
            supportLineOne={""}
             />
            <div className='eventContainer'>
                {events.map((blog) => (
                    <div className="events-preview" key={blog.id}>
                        <h2>{blog.title}</h2>
                        <img className='cardImage' src= {mig} alt=''/>
                        <p>Organized by {blog.userID}</p>
                    </div>
                ))}
            </div> */}
            


        </div>

    );
}

export default Home;