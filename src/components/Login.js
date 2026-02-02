import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utlis/Validate';
const Login = () => {
  
  const[isSignInForm,setIsSignInForm] = useState(true);
  const[errorMessage,setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    // validate the form data
   const message = checkValidData(email.current.value , password.current.value);
   console.log(message);
   setErrorMessage(message);
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
       <Header/>
       <div className='absolute'>
        <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/cc73e7c7-7860-4ef4-8fc8-1baf24569d2f/web/IN-en-20260126-TRIFECTA-perspective_90d714e8-acc9-4253-ab46-ca6b349c1989_small.jpg" alt = "logo"/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className= ' w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80'>
        <h1 className="text-white text-3xl font-bold mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input 
          type = "text" 
          placeholder= "UserName" 
          className= "w-full p-4 mb-6 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-white" 
        />)}
        <input 
          ref = {email}
          type = "text" 
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