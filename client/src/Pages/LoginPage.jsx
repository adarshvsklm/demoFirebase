import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login/Login';
import firebaseConfig from '../firebase/config';

function LoginPage() {
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
      <Login />
    </div>
  );
}

export default LoginPage;
