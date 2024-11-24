import React, { useState, useEffect } from 'react'
import '../Styles/login.css'
import { addUser, loginUser, signupuser,fetchUser } from '../connections/firebase'
import { signUpUser } from '../connections/firebase'
import { useAuth } from '../context/authContext'
import { Link } from 'react-router-dom';
import '../Styles/signup.css'
import { useUserContext } from '../context/userContext';



const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useAuth()
    const { dispatch : userDispatch} = useUserContext()


    return (
        <div>
            <form>
                <div className='signup'>Log in</div>
                <div className='subsignup'>Log Into your account</div>
                <input className='signupinput'
                    type="text"
                    placeholder='Email'
                    onChange={(event) => { setEmail(event.target.value) }}
                />
                <input className='signupinput'
                    type="text"
                    placeholder='Password'
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <button className='authButton' onClick={async function (e) {
                    e.preventDefault()
                    console.log({ email, password })
                    try {
                        const loggedInUser = await loginUser(email, password)
                        localStorage.setItem("emsToken", loggedInUser.accessToken)
                        console.log("user in the login", loggedInUser)
                        const docsnap = await fetchUser(loggedInUser.uid)
                        console.log(docsnap, "gotten user in the login")
                        if(docsnap !== undefined){
                            dispatch({ type: 'LOGIN' })
                            userDispatch({type: 'SET_USER', payload: docsnap})
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }}>Login</button>
                <div className='beneathsignup'>Don't have an account? <span><Link style={{ color: 'white' }} to='/signup'> signup</Link></span></div>
            </form>

        </div>
    )
}

export default Login
