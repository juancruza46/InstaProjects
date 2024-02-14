import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import AddPostPage from '../AddPostPage/AddPostPage';
import CategoryPage from '../CategoryPage/CategoryPage';
import NavBar from '../../components/NavBar/NavBar';

const App = () => {
  const [user, setUser] = useState({});
  return (
    <main className="App">
      <>
        <NavBar />
        {user ? (
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/add-post" element={<AddPostPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        ) : (
          <AuthPage />
        )}
      </>
    </main>
  );
};

export default App;


