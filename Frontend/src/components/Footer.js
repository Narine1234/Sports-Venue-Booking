// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from './images/logo1.jpeg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="Logo" />
          <h2>Turf Booking</h2>
        </div>
        <div className="footer-links">
          <div>
            <h3>About Us</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/support">Customer Support</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3>Connect</h3>
            <ul className="social-links">
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Turf Booking. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
