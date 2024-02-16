// LoginForm.jsx
import React, { useState } from 'react';
import * as usersService from '../../utilities/users-service';

const LoginForm = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      const { user } = await usersService.login(credentials);
      setUser(user);
    } catch (err) {
      console.error('Error during login:', err);
      setError('Log In Failed - Try Again');
    }
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};

export default LoginForm;

