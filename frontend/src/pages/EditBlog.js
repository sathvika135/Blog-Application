// src/pages/EditBlog.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';

export default function EditBlog() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); 
    }

    api.get(`/blogs/${id}/`)
      .then((res) => setForm(res.data))
      .catch((err) => {
        console.error('Failed to fetch blog', err);
        if (err.response?.status === 401) {
          alert('Unauthorized – Please login again.');
        }
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}/`, form);
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed. You might not be authorized.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Blog</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
      ></textarea>
      <button type="submit">Update</button>
    </form>
  );
}
