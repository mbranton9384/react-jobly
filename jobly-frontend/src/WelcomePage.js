import React from 'react';
import './WelcomePage.css';

function WelcomePage({ currentUser }) {
  return (
    <div className="welcome-container">
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      {currentUser && <h2>Welcome Back, {currentUser.username}!</h2>}
    </div>
  );
}

export default WelcomePage;
