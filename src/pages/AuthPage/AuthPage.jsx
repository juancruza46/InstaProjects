// AuthPage.jsx
import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpPage = ({ onSignUp }) => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm onSignUp={onSignUp} />
    </div>
  );
};

export default SignUpPage;






