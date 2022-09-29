import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { validation } from './validation';
import firebaseConfig from '../../firebase/config';
import firebase from 'firebase';


function Signup() {
  const [form, setForm] = useState({});

  const navigate = useNavigate();
  let valid = validation(form);

  //googleSignup
  var provider = new firebase.auth.GoogleAuthProvider();

  const googleSignup = () => {
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
  /////

  const handleSubmit = () => {
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((userCredential) => {
          let user = userCredential.user;
          console.log(user);

          user.updateProfile({ displayName: form.name }).then(() => {
            firebaseConfig
              .firestore()
              .collection('users')
              .add({
                id: user.uid,
                username: form.name,
                email: form.email,
              })
              .then(() => {
                navigate('/login');
              });
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mt-5'>
      <Button variant='contained' onClick={googleSignup}>
        Signup With Google
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
        <h3>SIGN UP</h3>

        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <TextField
          id='outlined-basic'
          label='Email'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        {!valid.hasEmail && form.email ? (
          <small style={{ color: 'red' }}>Enter Correct Email</small>
        ) : (
          ''
        )}
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        {form.password && (
          <div className='ml-1' style={{ columns: '2' }}>
            <div>
              <small
                style={valid.hasSixChar ? { color: 'green' } : { color: 'red' }}
              >
                Atleast six characters
              </small>
            </div>

            <div>
              <small
                style={
                  valid.hasLowerChar ? { color: 'green' } : { color: 'red' }
                }
              >
                One lowercase letter
              </small>
            </div>

            <div>
              <small
                style={
                  valid.hasUpperChar ? { color: 'green' } : { color: 'red' }
                }
              >
                One uppercase letter
              </small>
            </div>

            <div>
              <small
                style={
                  valid.hasSpecialChar ? { color: 'green' } : { color: 'red' }
                }
              >
                One special character
              </small>
            </div>

            <div>
              <small
                style={valid.hasNumber ? { color: 'green' } : { color: 'red' }}
              >
                One number
              </small>
            </div>
          </div>
        )}
        <TextField
          id='outlined-basic'
          label='Confirm Password'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, cPassword: e.target.value });
          }}
        />
        {form.password &&
          form.cPassword &&
          (form.cPassword != form.password ? (
            <small style={{ color: 'red' }}>Password does not match</small>
          ) : (
            ''
          ))}
        <Button
          disabled={
            !form.name ||
            !valid.hasSixChar ||
            !valid.hasLowerChar ||
            !valid.hasUpperChar ||
            !valid.hasSpecialChar ||
            !(form.cPassword === form.password) ||
            !valid.hasNumber ||
            !valid.hasEmail
          }
          variant='contained'
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <small
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => {
            navigate('/login');
          }}
        >
          {' '}
          Already have an account ? Click Here to Login
        </small>
      </Box>
    </div>
  );
}

export default Signup;
