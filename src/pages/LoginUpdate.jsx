import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/authContext'
import { addUser, loginUser, signupuser,fetchUser } from '../connections/firebase'
import { useUserContext } from '../context/userContext'
import '../Styles/loginUpdate.css'

const LoginUpdate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const { dispatch : userDispatch} = useUserContext()
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ email, password,  });
  };


  return (
    <div className= 'signupPage'>
        <div className="signup-container">
        <h1>Login</h1>
        <p>Log Into your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i>&#x1F464;</i>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className="login-button"
            onClick={async function (e) {
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
            }}
          >
            Login
          </button>
        </form>
        <div className="or">Or</div>
        <button className="google-login2">
           Login with Google
        </button>
        <div className="login-link">
          Don't have an account? <span> <Link style={{ color: '#d1410c' }} to='/signUpUpdate'>signup</Link> </span>
        </div>
      </div>
      
    </div>
  )
}

export default LoginUpdate
