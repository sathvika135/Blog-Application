import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '10px' }}>All Blogs</Link>
      {isLoggedIn ? (
        <>
          <Link to="/create" style={{ marginRight: '10px' }}>Create Blog</Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
