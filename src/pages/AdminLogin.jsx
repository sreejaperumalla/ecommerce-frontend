import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LockOutlined, AdminPanelSettings, ArrowForward } from '@mui/icons-material';
import { loginAdmin } from '../store/authSlice';

import './Login.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAdmin({ username, password }));
    if (loginAdmin.fulfilled.match(resultAction)) {
      navigate(from, { replace: true });
    } else {
      console.error(resultAction.payload || 'Admin login failed');
    }
  };

  return (
    <div className="page login-container">
      <div className="glass-card login-card-wrapper">
        <div className="login-header">
          <span className="eyebrow">Admin Access</span>
          <h1>Admin Portal</h1>
          <p>Please sign in to manage the store.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-container">
              <AdminPanelSettings className="input-icon dim" />
              <input 
                type="text" 
                className="input-field login-input" 
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-container">
              <LockOutlined className="input-icon dim" />
              <input 
                type="password" 
                className="input-field login-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-button login-button">
            Sign In to Admin <ArrowForward />
          </button>
        </form>

        <div className="login-footer" style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            Not an admin? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: '600' }}>User Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
