import React, { useState } from 'react'
import '../Styles/signupUpdate.css'
import { AuthContext, useAuth } from '../context/authContext'
import { useUserContext } from '../context/userContext'
import { addUser } from '../connections/firebase'
import { signUpUser } from '../connections/firebase'
import { Link } from 'react-router-dom';


const SignUpUpdate = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { dispatch } = useAuth()
  const { dispatch: userDispatch } = useUserContext()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ username, email, password, confirmPassword });
  };

  return (
    <div className= 'signupPage'>
      <div className="signup-container">
        <h1>Sign up</h1>
        <p>Create your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i>&#x1F464;</i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>&#x2709;</i>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>&#x2709;</i>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className='icon'>&#x1F512;</i>
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>&#x1F512;</i>
            <input
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="signup-button"
            onClick={async function (e) {
              e.preventDefault()
              console.log({ username, email, password, confirmPassword, phoneNumber })
              try {
                const signedUpUser = await signUpUser(email, password)
                localStorage.setItem("emsToken", signedUpUser.accessToken)
                console.log("user in the signup", signedUpUser)
                const docsnap = await addUser(signedUpUser.uid, username, email, password, confirmPassword, phoneNumber)
                if (docsnap !== undefined) {
                  dispatch({ type: 'LOGIN' })
                  userDispatch({ type: 'SET_USER', payload: docsnap })

                }

              } catch (error) {
                console.log(error)
              }
            }}
          >
            Sign up
          </button>
        </form>
        <div className="or">Or</div>
        <button className="google-login">
           Login with Google
        </button>
        <div className="login-link">
          Already have an account? <span> <Link style={{ color: '#d1410c' }} to='/loginUpdate'>Login</Link> </span>
        </div>
      </div>
    </div>

  )
}

export default SignUpUpdate
