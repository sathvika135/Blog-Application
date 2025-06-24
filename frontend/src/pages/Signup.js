// frontend/src/pages/Signup.js
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/api/register/', form); 
    const newUser = res.data;
    localStorage.setItem('user', JSON.stringify({ id: newUser.id, email: form.email }));
    alert('Registration successful!');
    navigate('/login');
  } catch (err) {
  if (err.response) {
    console.error('Response error:', err.response.data);
    alert('Registration failed: ' + JSON.stringify(err.response.data));
  } else {
    console.error('Other error:', err.message);
    alert('Registration failed. Check console for details.');
  }
}

};


  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
