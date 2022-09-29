import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
