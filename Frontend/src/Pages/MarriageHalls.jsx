import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './MarriageHalls.css';
import cardimage from '../synthetic-football-turf-500x500.jpg';
import FeedbackAndReview from './FeedbackAndReview';
import AccordionQnA from './AccordionQnA';
import Photos from './Photos';
import Videos from './Videos';
import BusinessDetails from './BusinessDetails';
import Overview from './Overview';
import CartDrawer from './CartDrawer';
import BookingModal from './BookingModal';
import { getTurfById } from '../services/turfService';
import { FaRupeeSign, FaUsers } from 'react-icons/fa';

function MarriageHalls() {
  const location = useLocation();
  const [turf, setTurf] = useState(location.state?.turf || null);
  const [alignment, setAlignment] = useState('OVERVIEW');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (!turf) {
      getTurfById(turf.id) // Replace with dynamic ID if needed
        .then(response => {
          setTurf(response.data);
        })
        .catch(error => {
          console.error('Error fetching turf data:', error);
        });
    }
  }, [turf]);

  const handleToggleChange = (newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBooking = (slot, members, date) => {
    const newCartItem = {
      slot,
      members,
      turfName: turf?.title,
      turfLocation: turf?.address,
      date
    };
    setCartItems([...cartItems, newCartItem]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const calculateTotal = () => {
    return cartItems.length * 100;
  };

  const sections = ['OVERVIEW', 'BUSINESS-DETAILS', 'IMAGES', 'VIDEOS', 'Q&A\'s', 'REVIEWS'];

  return (
    <div className="app-body">
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={12}>
            <Card className="turf-card vertical-card">
              <Card.Body>
                <Row>
                  <Col md={3} className="text-center">
                    <Card.Img src={turf?.image || cardimage} className="turf-logo" />
                  </Col>
                  <Col md={9} className="card-content">
                    <div className="card-details">
                      <Card.Title className="turf-title">
                        <i className="fas fa-futbol"></i> {turf ? turf.title : 'Loading...'}
                      </Card.Title>
                      <Card.Text className="mt-3">
                        <a href={`https://www.google.com/maps?q=${encodeURIComponent(turf ? turf.address : '')}`} target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-map-marker-alt"></i> {turf ? turf.address : 'Loading...'}
                        </a> <br />
                        <span className="text-success"><i className="fas fa-clock"></i>{turf ? turf.openingTime || 'Open 24 Hrs' : 'Loading...'}</span> <br />
                        <span className="text-success"> Amount per Hour: <FaRupeeSign />{turf ? turf.amountPerHour || 'Loading...' : 'Loading...'}</span> <br />
                        <span className="text-success"><FaUsers /> Maximum Members per Hour: {turf ? turf.maxMembersPerHour || 'Loading...' : 'Loading...'}</span> <br />
                      </Card.Text>
                      <div className="contact-buttons">
                        <Button variant="success" className="mb-2"><i className="fas fa-phone"></i> {turf ? turf.phone : 'Loading...'}</Button>
                        <Button variant="primary" className="mb-2"><WhatsAppIcon /> Chat</Button>
                        <Button variant="info" className="mb-2"><i className="fas fa-envelope"></i> Send Enquiry</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="toggle-button-group">
              {sections.map((section, index) => (
                <button
                  key={section}
                  className={`toggle-button ${alignment === section ? 'active' : ''}`}
                  onClick={() => handleToggleChange(section)}
                >
                  {section.replace('-', ' ')}
                </button>
              ))}
              <div
                className="highlight"
                style={{
                  left: `${sections.indexOf(alignment) * (100 / sections.length)}%`,
                }}
              />
            </div>

            {alignment === 'OVERVIEW' && <Overview />}
            {alignment === 'BUSINESS-DETAILS' && <BusinessDetails />}
            {alignment === 'IMAGES' && <Photos />}
            {alignment === 'VIDEOS' && <Videos />}
            {alignment === 'Q&A\'s' && <AccordionQnA />}
            {alignment === 'REVIEWS' && <FeedbackAndReview />}
          </Col>
        </Row>
      </Container>

      {cartOpen && (
        <CartDrawer
          cartItems={cartItems}
          onClose={() => setCartOpen(false)}
          onRemoveItem={removeFromCart}
          calculateTotal={calculateTotal}
        />
      )}

<BookingModal
  show={showBookingModal}
  onHide={() => setShowBookingModal(false)}
  turfId={turf?.id}
  turfName={turf.title} // Passing turfId to the BookingModal
  openingTime={turf?.openingTime}
  amountPerHour={turf?.amountPerHour}
  maxMembersPerHour={turf?.maxMembersPerHour}// Pass openingTime as a prop
  onBook={handleBooking}
/>

      <div className="fab-container">
        <Fab variant="extended" color="secondary" aria-label="navigate" className="fab-button" onClick={handleBookNow}>
          <NavigationIcon sx={{ mr: 1 }} />
          <b>Book Now</b>
        </Fab>
      </div>
    </div>
  );
}

export default MarriageHalls;
