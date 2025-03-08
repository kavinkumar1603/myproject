import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/next');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Enter your email and password to log in</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
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
