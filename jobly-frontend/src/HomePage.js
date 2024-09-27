import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        <div className="homepage-buttons">
          <Link to="/login">
            <button className="btn">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="btn">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

