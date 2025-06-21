import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="left-nav">
        <li><Link to="/" >GitPeek</Link></li>
      </ul>

      <ul className="right-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/bookmark">Show Bookmark</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
