import React from 'react';
import Signup from '../Components/Signup/Signup';
import firebaseConfig from '../firebase/config';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  firebaseConfig.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      console.log(user);
      navigate('/');
    }
  });
  return (
    <div>
      <Signup />
    </div>
  );
}

export default SignupPage;
