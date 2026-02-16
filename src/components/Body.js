import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utlis/Firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utlis/userSlice'

// ✅ Router should be outside component
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/Browse",
    element: <Browse />
  }
]);

const Body = () => {

  const dispatch = useDispatch();
 
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        
      } else {
        dispatch(removeUser());
        
      }
    });

    return () => unsubscribe();

  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
