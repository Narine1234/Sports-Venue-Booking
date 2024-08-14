import React from 'react';
import './StatsCard.css'; // Import CSS for custom styling

function StatsCard({ icon, count, label, color }) {
  return (
    <div className="stats-card">
      <div className="stats-card-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stats-card-details">
        <div className="stats-card-count">{count}</div>
        <div className="stats-card-label">{label}</div>
      </div>
    </div>
  );
}

export default StatsCard;
