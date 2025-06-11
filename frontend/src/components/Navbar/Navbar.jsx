import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="left-nav">
        <li><Link to="/" >GitPeek</Link></li>
      </ul>

      <ul className="middle-nav">
        <li><Link to="/discover">Discover</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <ul className="right-nav">
        <li><Link to="/bookmark">Show Bookmark</Link></li>
        {/* <li><Link to="/login">Login</Link></li> */}
        {/* <li><Link to="/signup" className="signup-btn">Sign Up</Link></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
