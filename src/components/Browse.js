import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';

const Browse = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Prevent flash of content before redirect
  }

  return (
    <div>
      <Header />
      <div className="pt-20">
        <h1 className="text-white text-4xl font-bold text-center">Welcome, {user.displayName || user.email}!</h1>
        <p className="text-white text-center mt-4">Browse page content goes here</p>
      </div>
    </div>
  )
}

export default Browse