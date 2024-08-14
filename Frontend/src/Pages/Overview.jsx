import React from 'react';
import './Overview.css';

const Overview = () => {
  return (
    <div className="overview-container">
      <h5 className="overview-header">Overview</h5>
      <p className="overview-description">
        Green Turf Arena is the premier football turf in the heart of the city, offering top-notch facilities and a well-maintained playing surface. Our arena is perfect for players of all levels, whether you're looking to play a casual match with friends, train professionally, or host a tournament. We pride ourselves on our excellent customer service, clean amenities, and convenient location.
      </p>
      <div className="overview-content">
        <div className="overview-column">
          <h6>Features</h6>
          <ul className="overview-features">
            <li>State-of-the-art artificial turf</li>
            <li>Floodlights for night play</li>
            <li>Shower and changing facilities</li>
            <li>Ample parking space</li>
            <li>On-site refreshments and snacks</li>
          </ul>
        </div>
        <div className="overview-column">
          <h6>Rules and Regulations</h6>
          <ul className="overview-rules">
            <li>All players must wear appropriate footwear and gear.</li>
            <li>No food or drinks are allowed on the turf.</li>
            <li>Respect the booking times and vacate the field promptly.</li>
            <li>Smoking and alcohol consumption are strictly prohibited.</li>
            <li>Dispose of trash in the provided bins.</li>
            <li>Report any damage or issues to the management immediately.</li>
            <li>Follow all safety instructions and guidelines provided by the staff.</li>
          </ul>
        </div>
      </div>
      <p className="additional-info">
        For any further information or queries, please contact us at 09980799064 or email us at johndoe@example.com.
      </p>
    </div>
  );
};

export default Overview;
