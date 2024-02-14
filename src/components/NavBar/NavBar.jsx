import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file

const NavBar = ({ onLinkClick }) => {
  const handleLinkClick = (route) => {
    if (onLinkClick) {
      onLinkClick(route);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/home" onClick={() => handleLinkClick('/home')}>
        Home
      </Link>
      <span className="divider"> | </span>
      <Link to="/favorites" onClick={() => handleLinkClick('/favorites')}>
        Favorites
      </Link>
      <span className="divider"> | </span>
      <Link to="/add-post" onClick={() => handleLinkClick('/add-post')}>
        Add Post
      </Link>
      <span className="divider"> | </span>
      <Link to="/category/react" onClick={() => handleLinkClick('/category/react')}>
        Category
      </Link>
    </nav>
  );
};

export default NavBar;
