import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';

import Navbar from './components/Navbar';
import { setAuthToken } from './services/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setAuthToken(storedToken);
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setAuthToken(newToken);
      setToken(newToken);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
        <Route path="/edit/:id" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
