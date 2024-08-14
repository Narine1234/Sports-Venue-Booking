import React, { useState, useEffect } from 'react';
import './TurfCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';

function TurfCard({ location, turfType, ratingFilter }) {
  const [turfs, setTurfs] = useState([]);
  const [isFavorite, setIsFavorite] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/turfs');
        console.log('Fetched data:', response.data); // Log data for debugging
        const dataWithFormattedFields = response.data.map(turf => ({
          ...turf,
          services: turf.services ? turf.services.split(',').map(service => service.trim()) : [],
          image: turf.image ? `data:image/png;base64,${turf.image}` : null
        }));
        setTurfs(dataWithFormattedFields);
      } catch (error) {
        console.error('Error fetching turfs:', error);
      }
    };
    fetchTurfs();
  }, []);

  const getStarRating = (rating) => {
    const fullStars = rating ? Math.floor(rating) : 0;
    const hasHalfStar = rating ? rating % 1 !== 0 : false;
    const halfStarWidth = hasHalfStar ? `${(rating % 1) * 100}%` : '0%';
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <>
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="star filled">★</span>
            ))}
            {hasHalfStar && (
                <span className="star half-filled" style={{ '--half-star-width': halfStarWidth }}>
                    ★
                </span>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="star empty">★</span>
            ))}
            {(!rating || rating === 0) && (
                <span className="no-reviews">No Reviews Yet</span>
            )}
        </>
    );
};



  const toggleFavorite = (id) => {
    setIsFavorite(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleBookSlot = (turf) => {
    navigate('/marriage-halls', { state: { turf } });
  };

  const filteredTurfs = turfs.filter((turf) => {
    const matchesLocation = location === '' || turf.address.toLowerCase().includes(location.toLowerCase());
    const matchesTurfType = turfType === '' || (Array.isArray(turf.services) && turf.services.some(service => service.toLowerCase().includes(turfType.toLowerCase())));

    let matchesRating = true;
    if (ratingFilter) {
      const ratingRanges = {
        'below 2': [0, 2],
        '2 - 3': [2, 3],
        '3 - 4': [3, 4],
        '4 - 5': [4, 5],
      };
      const [minRating, maxRating] = ratingRanges[ratingFilter] || [0, 5];
      matchesRating = turf.rating >= minRating && turf.rating < maxRating;
    }

    return matchesLocation && matchesTurfType && matchesRating;
  });

  return (
    <div className="turf-list">
      {filteredTurfs.length > 0 ? (
        filteredTurfs.map((turf) => (
          <div className="turf-card" key={turf.id}>
            {turf.image ? (
              <img src={turf.image} alt={turf.title} className="turf-image" />
            ) : (
              <div className="placeholder-image">No Image Available</div>
            )}
            <div className="turf-info">
              <div className="turf-header">
                <h2 className="turf-title">{turf.title}</h2>
                <div className="verified-info">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="verified-icon"
                    title="Verified"
                  />
                  <span className="verified-text">Verified</span>
                </div>
              </div>
              <div className="turf-rating">
                <div className="rating-info">
                  <span className="stars">{getStarRating(turf.rating)}</span>
                  <h4 className="text-success"><b>Amount/Hr:  <FaRupeeSign /> {turf ? turf.amountPerHour || 'Loading...' : 'Loading...'}</b></h4>
                
                </div>
              </div>
              <p className="turf-address">{turf.address}</p>
              <div className="turf-services">
                {Array.isArray(turf.services) && turf.services.length > 0 ? (
                  turf.services.map((service, index) => (
                    <span key={index} className="service-tag">{service}</span>
                  ))
                ) : (
                  <p>No services available</p>
                )}
              </div>
              <div className="turf-actions">
                <a href={`tel:${turf.phone}`} className="call-button">Call</a>
                <button className="book-slot-button" onClick={() => handleBookSlot(turf)}>
                  Book Slot
                </button>
                <button className="favorite-button" onClick={() => toggleFavorite(turf.id)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`heart-icon ${isFavorite[turf.id] ? 'favorited' : ''}`}
                    title="Favorite"
                  />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading!!! Please Wait...</p>
      )}
    </div>
  );
}

export default TurfCard;
