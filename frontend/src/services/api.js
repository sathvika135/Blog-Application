import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Django backend
});

// Attach JWT token to Authorization header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// ✅ Corrected usage of `api`
export const createBlog = (blogData) => api.post('/blogs/', blogData);
export const fetchBlogs = () => api.get('/blogs/');

export default api;
