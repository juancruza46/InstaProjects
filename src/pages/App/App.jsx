import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import HomePage from '../HomePage/HomePage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import AddPostPage from '../AddPostPage/AddPostPage';
import ViewAllPostsPage from '../ViewAllPostsPage/ViewAllPostsPage';
import NavBar from '../../components/NavBar/NavBar';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate('/home');
    }
  }, [user, token, navigate]);

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const { user, token } = await response.json();
        setUser(user);
        setToken(token);
        navigate('/home');
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
    setToken(null);
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
        handleLogin(formData.email, formData.password);
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
      {user ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-post" element={<AddPostPage onAddPost={handleAddPost} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/view-all-posts" element={<ViewAllPostsPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUpForm onSignUp={handleSignUp} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} navigate={navigate} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;













