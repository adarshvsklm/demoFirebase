import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import firebaseConfig from '../../firebase/config';
 import firebase from 'firebase';

function Login() {
  const [form, setForm] = useState({});
  const [error, setError] = useState();
 
  const navigate = useNavigate();
  var provider = new firebase.auth.GoogleAuthProvider();


  const handleSubmit = () => {
    firebaseConfig.auth().signInWithEmailAndPassword(form.email, form.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('in signup');
     navigate('/')
    // ...
  })
  .catch((error) => {
 setError('Email Or Password Is Invalid')
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  };


  const googleLogin = () => {
    firebaseConfig
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
         // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <div className='mt-5'>
      <Button variant='contained' onClick={googleLogin}>
        Login With Google
      </Button>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        noValidate
        autoComplete='off'
      >
        <h3>Login</h3>
        {error && <small style={{ color: 'red' }}>{error}</small>}

        <TextField
          //   disabled={verified}
          id='outlined-basic'
          label='Email'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />

        <TextField
          type='password'
          id='outlined-basic'
          label='Password'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />

        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={!form.email || !form.password}
        >
          Submit
        </Button>
        <small
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => {
            navigate('/signup');
          }}
        >
          {' '}
          Don't Have an account ? Click Here to Signup
        </small>
      </Box>
    </div>
  );
}

export default Login;
