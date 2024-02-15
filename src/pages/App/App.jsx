// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm'; // Import the LoginForm component
import HomePage from '../HomePage/HomePage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import AddPostPage from '../AddPostPage/AddPostPage';
import ViewAllPostsPage from '../ViewAllPostsPage/ViewAllPostsPage';
import NavBar from '../../components/NavBar/NavBar';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

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

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          password,
        }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
  
        if (window.location.pathname !== '/home') {
          navigate('/home');
        }
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleSignUp = async (formData) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Signup successful');
        handleLogin(formData.email, formData.password); // Automatically log in after successful signup
      } else {
        console.error('Error during signup:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="App">
      <NavBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/signup"
          element={<SignUpForm onSignUp={handleSignUp} />}
        />
        <Route
          path="/login"
          element={<LoginForm onLogin={handleLogin} />}
        />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route
          path="/add-post"
          element={<AddPostPage onAddPost={handleAddPost} />}
        />
        <Route
          path="/view-all-posts"
          element={<ViewAllPostsPage />}
        />
      </Routes>
    </div>
  );
};

export default App;










