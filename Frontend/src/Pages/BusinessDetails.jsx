import React from 'react';
import './BusinessDetails.css';

const BusinessDetails = () => {
  return (
    <div className="business-details-container">
      <h5 className="business-details-header">Business Details</h5>
      <div className="details-content">
        <div className="details-column">
          <div className="detail-item">
            <span className="detail-label">Owner:</span>
            <span className="detail-value">John Doe</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Contact:</span>
            <span className="detail-value">09980799064</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">johndoe@example.com</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">Downtown, City Name</span>
          </div>
        </div>
        <div className="details-column">
          <div className="detail-item">
            <span className="detail-label">Established:</span>
            <span className="detail-value">2012</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Membership Plans:</span>
            <span className="detail-value">Available</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Training Sessions:</span>
            <span className="detail-value">Offered</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Event Hosting:</span>
            <span className="detail-value">Available</span>
          </div>
        </div>
      </div>
      <p className="mission-statement">
        Our mission is to provide a safe and enjoyable environment for sports lovers.
      </p>
    </div>
  );
};

export default BusinessDetails;
