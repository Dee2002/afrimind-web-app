import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    axios.post('http://localhost:5000/api/users/register', formData)
      .then(res => {
        console.log(res.data);

        /* Store the token in local storage */
        localStorage.setItem('authToken', res.data.token);

        /* Redirect to dashboard after successful registration */
        navigate('/dashboard');
      })
      .catch(err => {
        setMessage(err.response?.data?.error || 'Registration failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <h1>Register for AfriMind</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="register-input"
        />
        <button type="submit" disabled={loading} className="register-button">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
