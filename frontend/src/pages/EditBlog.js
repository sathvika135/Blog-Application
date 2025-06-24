// src/pages/EditBlog.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const EditBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}/`); // ✅ fixed URL
        setForm({ title: res.data.title, content: res.data.content });
      } catch (error) {
        console.error('Failed to fetch blog', error);
        alert('Blog not found');
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/blogs/${id}/`, form); // ✅ fixed URL
      alert('Blog updated!');
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      alert('Failed to update blog');
    }
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
