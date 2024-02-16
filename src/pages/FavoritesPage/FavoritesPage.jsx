import React from 'react';
import './FavoritesPage.css';

const FavoritesPage = ({ user }) => {
  return (
    <div>
      {user ? (
        <h1 className="favh1">Your Favorite Posts</h1>
      ) : (
        <h2 className="favh1">Please sign in to view your favorites.</h2>
      )}
      {/* Rest of your component code */}
    </div>
  );
};

export default FavoritesPage;
