import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import AddPostPage from '../AddPostPage/AddPostPage';
import ViewAllPostsPage from '../ViewAllPostsPage/ViewAllPostsPage';
import NavBar from '../../components/NavBar/NavBar';

const App = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.log('Post added successfully!');

        navigate('/view-all-posts');
      } else {
        console.error('Error adding post:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        {user ? (
          <>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/add-post" element={<AddPostPage onAddPost={handleAddPost} />} />
            <Route path="/view-all-posts" element={<ViewAllPostsPage />} />
          </>
        ) : null}
      </Routes>
    </div>
  );
};

export default App;


