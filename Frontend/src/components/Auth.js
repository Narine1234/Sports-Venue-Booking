// src/components/Auth.js
import React, { useState } from 'react';
import './Auth.css'; // Assuming you have a CSS file for styling

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <div className="auth-form">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <span onClick={toggleAuthMode}>Sign up</span></p>
        </div>
      ) : (
        <div className="auth-form">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <span onClick={toggleAuthMode}>Login</span></p>
        </div>
      )}
    </div>
  );
}

export default Auth;
