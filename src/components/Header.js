import React from 'react'
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utlis/Firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utlis/userSlice';

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
       <img className = "w-44" src = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png " alt = "Logo"/>
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