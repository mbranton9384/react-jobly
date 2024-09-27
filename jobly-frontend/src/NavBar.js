import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ currentUser, logout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Jobly</Link>
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <>
            <Link to="/companies">Companies</Link>
            <Link to="/jobs">Jobs</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
