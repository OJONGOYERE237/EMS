import React, { useContext, useState } from 'react'
import '../Styles/signup.css'
import { addUser } from '../connections/firebase'
import { signUpUser } from '../connections/firebase'
import { AuthContext, useAuth } from '../context/authContext'
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/userContext'


const SignUp = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useAuth()
    const { dispatch: userDispatch } = useUserContext()


    return (
        <div>
            <form>
                <div className='signup'>Sign up</div>
                <div className='subsignup'>Sign up to continue</div>
                <input className='signupinput'

                    type="text"
                    placeholder='Username'
                    onChange={(event) => { setUsername(event.target.value) }}
                />
                <input className='signupinput'
                    type="text"
                    placeholder='Email'
                    onChange={(event) => { setEmail(event.target.value) }}
                />
                <input className='signupinput'
                    type="text"
                    placeholder='Phone Number'
                    onChange={(event) => { setPhoneNumber(event.target.value) }}
                />
                <input className='signupinput'
                    type="text"
                    placeholder='Password'
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <button className='authButton' onClick={async function (e) {
                    e.preventDefault()
                    console.log({ username, email, password, phoneNumber })
                    try {
                        const signedUpUser = await signUpUser(email, password)
                        localStorage.setItem("emsToken", signedUpUser.accessToken)
                        console.log("user in the signup", signedUpUser)
                        const docsnap = await addUser(signedUpUser.uid, username, email, password, phoneNumber)
                        if (docsnap != undefined) {
                            dispatch({ type: 'LOGIN' })
                            userDispatch({ type: 'SET_USER', payload: docsnap })

                        }

                    } catch (error) {
                        console.log(error)
                    }
                }}>sign up</button>
                <div className='beneathsignup'>Already have an account? <span > <Link style={{ color: 'white' }} to='/login'>login</Link> </span></div>
            </form>

        </div>
    )
}

export default SignUp
