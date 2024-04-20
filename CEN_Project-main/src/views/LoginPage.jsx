import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import {auth} from '../firebase/config.js';
import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
} from "firebase/auth";
import './LoginPage.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import "./MainPage.css";



function LoginPage({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  console.log(auth);
  function handleCredentials(e) {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    setError('')
  }
  
  function handleSignup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
      // Signed up 
      console.log(userCredential.user);
      const user = userCredential.user;
      // ...
      })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(error.message)
      });
  }

  function handleLogin(e){
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
      console.log(userCredential.user);
      setLoggedIn(true);
      onLogin();
    })
    .catch((error) => {
      setError(error.message)
    });
  }

  
  if (isLoggedIn) {
    return <Navigate to="/main"/>;
  }
  

    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="login-page">
        
          <section>
          <div className="maintitle">
            <img src={logo} alt="Hat" className="mainlogo" />
          </div>

          <br />
          
            <p className="login-description">Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label className="email-pass">Email</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label className="email-pass">Password</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>{handleLogin(e)}} className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(e)=>{handleSignup(e)}} className="active btn btn-block">Sign Up</button>
                  }
                  {
                    error && 
                    <div className="error">
                    {error}
                    </div>
                  }

                  <p className="forgot-password">Forgot Password?</p>
              </form>
          </section>
        </div>
        
      </>
    )
  }
  
  export default LoginPage