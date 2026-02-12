import React from 'react'
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utlis/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utlis/userSlice';
import { LOGO } from '../utlis/constants';

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center" >
       <img className = "w-44" src = {LOGO} alt = "Logo"/>
       {user && (
         <div className="flex items-center">
           <span className="text-white mr-4">{user.displayName || user.email}</span>
           <button 
             onClick={handleSignOut}
             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
           >
             Sign Out
           </button>
         </div>
       )}
    </div>
  )
}

export default Header