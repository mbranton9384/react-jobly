import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import NavBar from './NavBar';
import Companies from './Companies';
import CompanyDetails from './CompanyDetails';
import Jobs from './Jobs';
import JobDetails from './JobDetails';
import JoblyApi from './api';
import WelcomePage from './WelcomePage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (loginData) => {
    try {
      const token = await JoblyApi.login(loginData);
      localStorage.setItem('token', token);
      setCurrentUser(loginData);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const signup = async (signupData) => {
    try {
      const token = await JoblyApi.signup(signupData);
      localStorage.setItem('token', token);
      setCurrentUser(signupData);
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <NavBar currentUser={currentUser} logout={logout} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginForm login={login} />} />
        <Route path='/signup' element={<SignupForm signup={signup} />} />
        <Route path='/companies' element={<Companies />} />
        <Route path='/companies/:handle' element={<CompanyDetails />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/jobs/:id' element={<JobDetails />} />
        <Route path='/welcome' element={<WelcomePage currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

