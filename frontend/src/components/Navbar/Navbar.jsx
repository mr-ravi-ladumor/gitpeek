import { NavLink, Link } from 'react-router-dom';
import { ImGithub } from 'react-icons/im';
import { BsBookmarkFill } from 'react-icons/bs';
import { FiCompass, FiInfo } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon-wrapper">
            <ImGithub />
          </span>
          <span className="logo-text">GitPeek</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <FiCompass className="nav-icon" />
              <span>Explore</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/bookmark" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <BsBookmarkFill className="nav-icon" />
              <span>Bookmarks</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <FiInfo className="nav-icon" />
              <span>About</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
