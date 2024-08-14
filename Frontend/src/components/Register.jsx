import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    idProof: '',
    idProofImage: null,
  });
  
  const [registrationSuccess, setRegistrationSuccess] = useState(false);  // Add state for success message
  const [error, setError] = useState(null);  // Add state for error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      idProofImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post('http://localhost:8083/api/auth/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRegistrationSuccess(true);  // Set success message state
      setTimeout(() => navigate('/login'), 2000);  // Redirect after 2 seconds
    } catch (error) {
      console.error(error);
      const errorMessage = error.response ? error.response.data.message : 'Error during registration';
      setError(errorMessage);  // Set error message state
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
              <h3>Sign UP</h3>
            </div>
            {registrationSuccess && (
              <div className="alert alert-success" role="alert">
                Registration successful! Redirecting to login...
              </div>
            )}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="input-group mb-3">
              <input
                type="text"
                name="fullName"
                className="custom-input"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
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
                placeholder="Set Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="confirmPassword"
                className="custom-input"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group mb-3">
              <label>ID Proof:</label>
              <select name="idProof" className="custom-input" onChange={handleChange} value={formData.idProof}>
                <option value="">Select...</option>
                <option value="aadhar">Aadhar</option>
                <option value="drivingLicense">Driving License</option>
                <option value="passport">Passport</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <label>Upload ID Proof Image:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {formData.idProofImage && <img src={URL.createObjectURL(formData.idProofImage)} alt="ID Proof" style={{ maxWidth: '100px', marginTop: '10px' }} />}
            </div>
            <div className="input-group mb-1">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="formCheck" />
                <label htmlFor="formCheck" className="form-check-label text-secondary">
                  <small>Agree to Terms</small>
                </label>
              </div>
            </div>
            <div className="input-group mb-3">
              <button onClick={handleSubmit} className="btn1 btn-lg btn-primary w-100 fs-6">
                Sign Up
              </button>
            </div>
            <div className="row">
              <small>
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
