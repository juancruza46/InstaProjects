// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file

const NavBar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/home">Home</Link>
      <span className="divider"> | </span>
      <Link to="/favorites">Favorites</Link>
      <span className="divider"> | </span>
      <Link to="/add-post">Add Post</Link>
      <span className="divider"> | </span>
      <Link to="/view-all-posts">View All Posts</Link>
      <span className="divider"> | </span>
      {user ? (
        <>
          <span>Welcome, {user.name}!</span>
          <span className="divider"> | </span>
          <button onClick={onLogout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <span className="divider"> | </span>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;


