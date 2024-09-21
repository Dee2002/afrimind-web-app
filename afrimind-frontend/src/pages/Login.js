import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState('');  // Error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loading spinner
    setError('');  // Reset error

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('authToken', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="login-container">
      <h1>Login to AfriMind</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}  {/* Error message */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`login-input ${error ? 'error' : ''}`}  // Apply error class
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={`login-input ${error ? 'error' : ''}`}  // Apply error class
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Processing...' : 'Login'}  {/* Show loading state */}
        </button>
      </form>
    </div>
  );
};

export default Login;
