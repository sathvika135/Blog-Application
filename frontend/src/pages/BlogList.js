import { setAuthToken } from '../services/api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Corrected endpoint: starts with `/api/blogs/`
  const fetchBlogList = async (url = '/api/blogs/') => {
    setLoading(true);
    try {
      const res = await API.get(url);
      setBlogs(res.data.results || res.data); // fallback if not paginated
      setNext(res.data.next || null);
      setPrevious(res.data.previous || null);
    } catch (error) {
      console.error('Failed to fetch blogs', error);
      if (error.response?.status === 401) {
        alert('Unauthorized: Please log in again');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); 
    }
    fetchBlogList(); 
  }, []);

  const handlePageChange = (url) => {
    const apiUrl = url.replace('http://127.0.0.1:8000', ''); // ✅ ensure relative path
    fetchBlogList(apiUrl);
  };

  return (
    <div>
      <h2>All Blogs</h2>
      {loading && <p>Loading...</p>}
      {!loading && blogs.length === 0 && <p>No blogs found.</p>}
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <br />
            <small>Posted on {new Date(blog.created_at).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
      <div>
        {previous && <button onClick={() => handlePageChange(previous)}>Previous</button>}
        {next && <button onClick={() => handlePageChange(next)}>Next</button>}
      </div>
    </div>
  );
};

export default BlogList;
