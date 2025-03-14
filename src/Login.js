import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
    if (password.length < 5) {
      setPasswordError('Password must be at least 5 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (valid) {
      navigate('/next');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Enter your email and password to log in</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot Password ?</a>
        </div>
        <button type="submit">Log In</button>
      </form>
      <div className="login-with">
        <p>Or login with</p>
        <div className="social-buttons">
          <button className="google">G</button>
          <button className="facebook">f</button>
          <button className="apple"></button>
          <button className="phone">📱</button>
        </div>
      </div>
      <p>Don't have an account? <a href="#">Sign Up</a></p>
    </div>
  );
}

export default Login;
