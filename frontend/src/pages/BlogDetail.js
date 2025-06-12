import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}/`);
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${id}/`);
      alert("Blog deleted");
      navigate('/');
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
      alert('Failed to delete blog');
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p><small>
    Posted by {blog.author?.username} on {new Date(blog.created_at).toLocaleDateString()}
  </small></p>

      {blog.author && currentUserId === blog.author.id && (
        <div>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate(`/blogs/${id}/edit`)}>Edit</button>
        </div>
      )}
      
    </div>
  );
};

export default BlogDetail;
