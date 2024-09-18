import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to AfriMind</h1>
      <p>Your mental wellness companion for African women.</p>
      <Link to="/register">Get Started</Link>
      <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
