import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from './images/logo1.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

function NavBar({ setLocation, setTurfType, setRatingFilter }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userEmail, logout } = useAuth();
  const [isProfileActive, setIsProfileActive] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = () => {
    const locationValue = document.querySelector('.location-select').value;
    const turfTypeValue = document.querySelector('.turf-type-select').value;
    const ratingValue = document.querySelector('.rating-select').value;
    setLocation(locationValue);
    setTurfType(turfTypeValue);
    setRatingFilter(ratingValue);
  };

  const shouldShowDropdowns = !['/advertise', '/contact-us', '/signin', '/signup'].includes(location.pathname);

  console.log('Is Authenticated:', isAuthenticated); // Debugging line
  console.log('User Email:', userEmail);             // Debugging line

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        {shouldShowDropdowns && (
          <>
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
              <select className="location-select">
                <option value="">Select Location</option>
                <option value="Sundarapuram, Coimbatore">Sundarapuram, Coimbatore</option>
                <option value="Singanallur, Coimbatore">Singanallur, Coimbatore</option>
                <option value="Ramanathapuram, Coimbatore">Ramanathapuram, Coimbatore</option>
                <option value="Peelamedu, Coimbatore">Peelamedu, Coimbatore</option>
                <option value="Saibaba Colony, Coimbatore">Saibaba Colony, Coimbatore</option>
                <option value="RS Puram, Coimbatore">RS Puram, Coimbatore</option>
                <option value="Gandhipuram, Coimbatore">Gandhipuram, Coimbatore</option>
                <option value="Ukkadam, Coimbatore">Ukkadam, Coimbatore</option>
                <option value="Saravanampatti, Coimbatore">Saravanampatti, Coimbatore</option>
              </select>
            </div>
            <div className="input-wrapper">
              <select className="turf-type-select">
                <option value="">Select Turf Type</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Badminton">Badminton</option>
                <option value="Table Tennis">Table Tennis</option>
                <option value="Squash">Squash</option>
                <option value="Swimming">Swimming</option>
                <option value="Yoga">Yoga</option>
                <option value="Hockey">Hockey</option>
                <option value="Volleyball">Volleyball</option>
              </select>
              <select className="rating-select">
                <option value="">Select Rating</option>
                <option value="below 2">Below 2</option>
                <option value="2 - 3">2 - 3</option>
                <option value="3 - 4">3 - 4</option>
                <option value="4 - 5">4 - 5</option>
              </select>
              <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
          </>
        )}
      </div>
      <div className="navbar-right">
        {location.pathname === '/advertise' ? (
          <Link to="/" className="navbar-link">Home</Link>
        ) : (
          <Link to="/advertise" className="navbar-link">Advertise</Link>
        )}
        {location.pathname === '/contact-us' ? (
          <Link to="/" className="navbar-link">Let's Play</Link>
        ) : (
          <Link to="/contact-us" className="navbar-link">Contact Us</Link>
        )}
        {isAuthenticated ? (
          <div className="profile-section">
            <FontAwesomeIcon
              icon={faUser}
              className="profile-icon"
              onClick={() => setIsProfileActive(!isProfileActive)}
            />
            {isProfileActive && (
              <div className="profile-details">
                <div className="email-display">{userEmail}</div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="navbar-link">Login / Sign Up</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
