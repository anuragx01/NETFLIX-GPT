import React, { useRef, useState, useEffect } from 'react'
import Header from './Header';
import { checkValidData } from '../utlis/Validate';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utlis/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utlis/userSlice';
import { LOGIN } from '../utlis/constants';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const[isSignInForm,setIsSignInForm] = useState(true);
  const[errorMessage,setErrorMessage] = useState(null);

  useEffect(() => {
    // If user is already logged in, redirect to Browse
    if (user) {
      navigate("/Browse");
    }
  }, [user, navigate]);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    // validate the form data
   const message = checkValidData(email.current.value , password.current.value);
   setErrorMessage(message);

  if(message) return ;

  if(!isSignInForm) {
    // Sign Up Logic - Validate username
    if(!name.current || !name.current.value || name.current.value.trim() === "") {
      setErrorMessage("Please enter a username");
      return;
    }

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        const userName = name.current.value.trim();
        
        // Update the user's profile with the username
        updateProfile(user, {
          displayName: userName
        }).then(() => {
          console.log("User profile updated with username:", userName);
          // Update Redux store with user info
          const {uid, email, displayName} = user;
          dispatch(addUser({uid, email, displayName}));
          // Navigate to browse page
          navigate("/Browse");
        }).catch((error) => {
          console.error("Error updating profile:", error);
          setErrorMessage("Error updating username: " + error.message);
        });
        console.log("User signed up:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
        console.error("Sign-up error:", errorCode, errorMessage);
      });

  }
  else {
    // Sign In Logic
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        // Update Redux store with user info
        const {uid, email, displayName} = user;
        dispatch(addUser({uid, email, displayName}));
        // Navigate to browse page
        navigate("/Browse");
        setErrorMessage(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
        console.error("Sign-in error:", errorCode, errorMessage);
      });
  }

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
       <Header/>
       <div className='absolute'>
        <img src = {LOGIN} alt = "logo"/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className= ' w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80'>
        <h1 className="text-white text-3xl font-bold mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input 
          ref={name}
          type = "text" 
          placeholder= "UserName" 
          className= "w-full p-4 mb-6 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white" 
        />)}
        <input 
          ref = {email}
          type = "email" 
          placeholder= "Email Address" 
          className = "w-full p-4 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white"
        />
        
        <input 
          ref = {password}
          type = "password" 
          placeholder= "Password" 
          className= "w-full p-4 mb-6 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white" 
        />
        <p className='text-red-500 font-bold text-lg py-2' >{errorMessage}</p>
        <button className= "w-full p-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 " onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 text-white cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign In Now" : "Already registered? Sign Up Now"}</p>
      </form>   
    </div>
  )
}

export default Login