import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);  // State for error messages

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8083/api/auth/login', formData);
      console.log('Login Response:', response.data); // Debugging line
      const token = response.data.jwt;  // Make sure this matches the response key
      localStorage.setItem('token', token); // Save token
      console.log('Token stored:', token); // Debugging line
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response ? error.response.data.message : 'Error during login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 body11">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <div className="featured-image mb-3">
            {/* <img src={pic} className="img-fluid" style={{ width: '250px' }} alt="Featured" /> */}
          </div>
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4">
              <h2>Welcome to PurePlay!!!</h2>
              <h3>Login</h3>
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="input-group mb-3">
              <input
                type="text"
                name="email"
                className="custom-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="password"
                className="custom-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <button onClick={handleSubmit} className="btn1 btn-lg btn-primary w-100 fs-6">
                Login
              </button>
            </div>
            <div className="row">
              <small>
                Don't have an account? <Link to="/register">Register</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
