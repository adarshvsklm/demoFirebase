import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC5EpiisFlSVm692WflAwlTf3A941xnWLY',
  authDomain: 'sampleauth-e539c.firebaseapp.com',
  projectId: 'sampleauth-e539c',
  storageBucket: 'sampleauth-e539c.appspot.com',
  messagingSenderId: '270821059375',
  appId: '1:270821059375:web:00a75c228459d4dca94fda',
  measurementId: 'G-6WVPLFJ17H',
};

export default firebase.initializeApp(firebaseConfig);