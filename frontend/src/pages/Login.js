// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await api.post('/api/token/', form);
    const { access } = res.data;

    localStorage.setItem('token', access);
    const decoded = jwtDecode(access);
    localStorage.setItem('user', JSON.stringify({ id: decoded.user_id }));
    

    setAuthToken(access);
    navigate('/');
  } catch (err) {
    console.error(err);
    if (err.response) {
      setError('Invalid credentials');
    } else {
      setError('Network Error: Backend is not reachable');
    }
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


