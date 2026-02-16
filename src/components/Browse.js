import React, { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import { API_OPTIONS } from '../utlis/constants';

const Browse = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const getNowPlayingMovies = useCallback(async() => {
    try {
      console.log("Fetching movies from TMDB API...");
      
      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", 
        {
          ...API_OPTIONS,
          signal: controller.signal
        }
      );
      
      clearTimeout(timeoutId);
      console.log("Response status:", data.status);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log("✅ Movies data fetched successfully:", json);
      console.log("Total results:", json.results?.length);
      return json;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error("❌ Request timeout: The API request took too long. Check your internet connection.");
      } else if (error.message.includes('Failed to fetch')) {
        console.error("❌ Network error: Unable to connect to TMDB API. Possible causes:");
        console.error("   - Check your internet connection");
        console.error("   - The API might be blocked by firewall/network");
        console.error("   - Try accessing from a different network");
      } else {
        console.error("❌ Error fetching movies:", error.message);
      }
      return null;
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User is logged in, fetching movies...");
      getNowPlayingMovies();
    }
  }, [user, getNowPlayingMovies]);

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