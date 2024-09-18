import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', formData)
      .then(res => {
        console.log(res.data);

        /* Store the token in local storage */
        localStorage.setItem('authToken', res.data.token);
        
        /* Redirect to dashboard after successful registration */
        navigate('/dashboard');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="register-container">
      <h1>Register for AfriMind</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="register-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="register-input"
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
