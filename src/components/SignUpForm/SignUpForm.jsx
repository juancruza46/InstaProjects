// SignUpForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ onSignUp }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [error, setError] = useState('');

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
    setError('');
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (formData.password !== formData.confirm) {
      setError('Passwords do not match');
    } else {
      try {
        // Call the onSignUp function passed from AuthPage
        await onSignUp(formData);
        // Redirect to login page after successful signup
        navigate('/auth/login');
      } catch (error) {
        console.error('Error during signup:', error);
        setError('Error during signup. Please try again.');
      }
    }
  };

  const disableButton = formData.password !== formData.confirm;

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
          <button type="submit" disabled={disableButton}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};

export default SignUpForm;


