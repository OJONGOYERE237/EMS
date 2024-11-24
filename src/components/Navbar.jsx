// import './Navbar.css'
import '../Styles/Navbar.css'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext'
import { useUserContext } from '../context/userContext';
import Button from '@mui/joy/Button';


const Navbar = () => {
    const { dispatch } = useAuth()
    const {dispatch: userDispatch} = useUserContext()
    const location = useLocation()
    const logout = () => {
        localStorage.removeItem("emsToken")
        dispatch({ type: "LOGOUT" })
        userDispatch({type: "SET_USER", payload: null})

    }
    return (
        <header >
            <div className="header-nav">
                <div className="logo">ProEventix</div>

                <div className="search-icon">
                    {/* <div className= "search-icon"> */}
                    <a href="#"><i className="bi bi-search"></i></a>
                    {/* <div><i className="bi bi-search"></i></div> */}
                    <input className='searchinput' type="text" placeholder="Search events" />
                    {/* </div> */}
                </div>
            <Button color="danger" sx={{width:"150px", margin: "40px"}}>Browse Events</Button>


                {/* <div className="location-icon">
                    <div className="location-icon">
                    <a href="#"><i className="bi bi-geo-alt-fill"></i></a>
                    <input className='searchinput' type="text" placeholder="Choose a location" />
                    <div><i class="bi bi-geo-alt-fill"></i></div>/
                    </div>
                </div> */}

                <div className="nav-links">
                    <nav>
                        {location.pathname == '/unAuth' ? <ul className='links'>
                            {/* <li><a href="#" className="nav-link">Find Events</a></li> */}
                            {/* <li> <Link to="/home" className="nav-link">Home</Link></li> */}
                            <li><a href="#" className="nav-link">Help </a></li>
                            <li><a href="#" className="nav-link">How it works</a></li>
                            <li><a href="../login page/index.html" className="nav-link">Explore</a></li>
                            <li><Link to="/signup" className="nav-link">Get Started</Link></li>

                        </ul> :
                            <ul className='links'>
                                <li> <Link to = "/createEvent" className="nav-link">Create Event</Link> </li>
                                <li><a href="#" className="nav-link">Features</a></li>
                                <li> <a href="#" className="nav-link"
                                    onClick={logout}

                                > Log Out</a></li>

                                {/* <li><a href="../login page/index.html" className="nav-link login">Help</a></li> */}
                                <li><Link>Settings</Link></li>
                            </ul>}
                    </nav>
                </div>

            </div>

        </header>
    );
}

export default Navbar;