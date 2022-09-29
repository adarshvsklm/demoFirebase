import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import firebaseConfig from '../firebase/config';
import Navbar from '../Navbar/Navbar';

function HomePage() {
  const navigate = useNavigate();
   const [userDetails,setUserDetails]=useState({})
 useEffect(()=>{
  firebaseConfig.auth().onAuthStateChanged((user) => {
    if (!user) {
      navigate('/login');
    } else {
      console.log(user);
      setUserDetails({name:user.displayName,email:user.email});
      
     }
  });
 },[]) 
  return (
    <div>
      <Navbar />
      <div>
          <h3>Profile</h3>
          <label>Name :</label>
          <label>{userDetails.name}:</label>
          <br />
          <label>Email :</label>
          <label>{userDetails.email}</label>
        </div>
     </div>
  );
}

export default HomePage;
