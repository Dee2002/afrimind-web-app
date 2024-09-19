import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); /* Initialize useNavigate hook */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/users/login', formData)
      .then(res => {
        console.log(res.data);

        /* Store the token in local storage */
        localStorage.setItem('authToken', res.data.token);

        navigate('/dashboard'); /* Redirect to dashboard after successful login */
      })
      .catch(err => {
        console.error(err.response?.data?.error || 'Login failed');
      });
  };

  return (
    <div className="login-container">
      <h1>Login to AfriMind</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;