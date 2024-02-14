import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/home">Home</Link>
      &nbsp; | &nbsp;
      <Link to="/favorites">Favorites</Link>
      &nbsp; | &nbsp;
      <Link to="/add-post">Add Post</Link>
      &nbsp; | &nbsp;
      <Link to="/category/react">Category</Link>
    </nav>
  );
};

export default NavBar;
