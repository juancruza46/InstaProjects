import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1 className="home-page-title">Welcome to the Home Page</h1>
      <p className="home-page-content">
        InstaProjects is an app that allows programmers to share their favorite projects with the community.
      </p>
      <img
        src="https://images.squarespace-cdn.com/content/v1/5769fc401b631bab1addb2ab/1541580611624-TE64QGKRJG8SWAIUS7NS/ke17ZwdGBToddI8pDm48kPoswlzjSVMM-SxOp7CV59BZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI6FXy8c9PWtBlqAVlUS5izpdcIXDZqDYvprRqZ29Pw0o/coding-freak.gif"
        alt="Coding Freak GIF"
        className="coding-freak-gif"
      />
    </div>
  );
};

export default HomePage;
