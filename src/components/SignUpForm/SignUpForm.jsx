import React, { useState } from 'react';

const SignUpForm = () => {
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

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (formData.password !== formData.confirm) {
      setError('Passwords do not match');
    } else {
      // Add logic to handle signup (e.g., API call)
      // Reset the form after successful signup
      setFormData({
        name: '',
        email: '',
        password: '',
        confirm: '',
      });
      setError('');
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
