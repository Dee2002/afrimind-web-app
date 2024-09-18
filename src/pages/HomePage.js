import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <img src="/AFRIMIND_LOGO.png" alt="AfriMind Logo" className="logo" />
        <h1>Welcome to AfriMind</h1>
        <p>Empowering Women. Rooted in Africa</p>
      </header>
      
      <div className="home-links">
        <Link to="/register" className="btn-link">Get Started</Link>
        <br />
        <Link to="/login" className="btn-link">Login</Link>
      </div>

      <footer className="home-footer">
        <p>&copy; 2024 AfriMind. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
