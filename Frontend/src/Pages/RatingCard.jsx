import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './RatingCard.css'; // You can style this component as needed

function RatingCard({ rating, onClose }) {
  return (
    <div className="rating-card-overlay">
      <Card className="rating-card">
        <Card.Body>
          <Card.Title>Your Rating</Card.Title>
          <div className="rating-stars">
            {[...Array(5)].map((_, index) => (
              <i 
                key={index} 
                className={`fas fa-star ${index < rating ? 'text-warning' : 'text-muted'}`}
              />
            ))}
          </div>
          <Button variant="primary" onClick={onClose} className="mt-3">
            Close
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RatingCard;
