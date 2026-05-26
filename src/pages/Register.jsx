import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EmailOutlined, LockOutlined, PersonOutlined, ArrowForward, VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';
import './Register.css';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      alert("Please agree to the terms before creating an account.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://e-commerce-production-68a9.up.railway.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      console.log(data);
      alert(data.message || "User Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = 'https://e-commerce-production-68a9.up.railway.app/auth/google';
  };

  return (
    <div className="page register-container">
      <div className="register-header">
        <h1>Create Account</h1>
      </div>

      <div className="glass-card register-card-wrapper">
        <button type="button" className="google-auth-button" onClick={handleGoogleLogin}>
          <svg className="google-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label className="form-label uppercase">USERNAME</label>
            <div className="input-container">
              <PersonOutlined className="input-icon dim" />
              <input 
                type="text" 
                className="input-field register-input" 
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label uppercase">EMAIL ADDRESS</label>
            <div className="input-container">
              <EmailOutlined className="input-icon dim" />
              <input 
                type="email" 
                className="input-field register-input" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label uppercase">PASSWORD</label>
            <div className="input-container">
              <LockOutlined className="input-icon dim" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-field register-input" 
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOffOutlined className="dim" /> : <VisibilityOutlined className="dim" />}
              </button>
            </div>
          </div>

          <div className="terms-checkbox-container">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="primary-button register-button" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create My Account"} <ArrowForward />
          </button>
        </form>
      </div>

      <div className="register-footer" style={{ marginTop: '32px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
