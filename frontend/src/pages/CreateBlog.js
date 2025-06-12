// src/pages/CreateBlog.js
import React, { useState } from 'react';
import { createBlog } from '../services/api';
const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createBlog({ title, content });
    alert('Blog created!');
  } catch (error) {
    console.error('Blog Create Error:', error.response?.data || error.message);
    alert('Error Creating Blog');
  }
};


  return (
    <div>
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
