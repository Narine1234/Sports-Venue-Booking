import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';
import './BookingModal.css'; // Import the CSS file

function BookingModal({ show, onHide, onBook, turfId, openingTime, amountPerHour, maxMembersPerHour, turfName }) {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to today
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [numberOfMembers, setNumberOfMembers] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]); // Track booked slots

  useEffect(() => {
    if (show && openingTime) {
      const generateTimeSlots = (openingTime) => {
        const [start, end] = openingTime.split(' - ');
        const startTime = moment(start, 'hh:mm A');
        const endTime = moment(end, 'hh:mm A');
        const slots = [];

        while (startTime.isBefore(endTime)) {
          const slotStart = startTime.format('hh:mm A');
          const slotEnd = moment(slotStart, 'hh:mm A').add(1, 'hour').format('hh:mm A');
          slots.push(`${slotStart} - ${slotEnd}`);
          startTime.add(1, 'hour');
        }

        return slots;
      };

      // Generate time slots based on opening time
      setTimeSlots(generateTimeSlots(openingTime));

      // Fetch booked slots if a date is selected
      if (selectedDate) {
        axios.get('http://localhost:8081/api/bookings/slots', {
          params: {
            date: moment(selectedDate).format('YYYY-MM-DD'),
            title: turfName // Use the turfName for fetching booked slots
          }
        })
        .then(response => {
          console.log('Booked Slots Response:', response.data); // Log the response
          setBookedSlots(response.data.bookedSlots || []);
        })
        .catch(error => console.error('Error fetching booked slots:', error));
      }
    }
  }, [show, openingTime, selectedDate, turfName]);

  const handleSlotChange = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setSelectedSlots((prevSlots) =>
        prevSlots.includes(slot)
          ? prevSlots.filter((s) => s !== slot)
          : [...prevSlots, slot]
      );
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    console.log('Retrieved Token:', token);

    if (token) {
      try {
        // Validate required fields
        if (!selectedDate || selectedSlots.length === 0 || !numberOfMembers) {
          setBookingSuccess('Please fill all required fields.');
          return;
        }

        const verifyResponse = await axios.get('http://localhost:8083/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Verification Response:', verifyResponse.data);

        if (verifyResponse.data.authenticated) {
          const bookingData = {
            title: turfName, // Use turfName for the booking title
            timeslot: selectedSlots.join(', '),
            date: moment(selectedDate).format('YYYY-MM-DD'),
            numberOfMembers,
            bookingAmount: calculateTotalAmount(),
            timestamp: moment().format('YYYY-MM-DDTHH:mm:ss'),
          };

          // Send the booking data
          await axios.post('http://localhost:8081/api/bookings', bookingData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setBookingSuccess('Booking successful!');
          setTimeout(() => {
            setBookingSuccess(null);
            onBook(selectedSlots, numberOfMembers, selectedDate);
            setSelectedDate(new Date()); // Reset to today’s date
            setSelectedSlots([]);
            setNumberOfMembers('');
            onHide();
          }, 3000);
        } else {
          console.log('User not authenticated');
          setShowLoginPrompt(true);
        }
      } catch (error) {
        console.error('Error during booking:', error.response ? error.response.data : error.message);
        setShowLoginPrompt(true);
      }
    } else {
      console.log('No token found');
      setShowLoginPrompt(true);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const calculateTotalAmount = () => {
    return selectedSlots.length * amountPerHour;
  };

  return (
    <>
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to be logged in to book a slot.</p>
          <Button variant="primary" onClick={handleLoginRedirect}>
            Go to Login
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginPrompt(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show && !showLoginPrompt} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Book Your Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingSuccess && <Alert variant={bookingSuccess.includes('successful') ? 'success' : 'danger'}>{bookingSuccess}</Alert>}
          <Form>
            <Form.Group as={Row} controlId="formDate">
              <Form.Label column sm={3}>Date:</Form.Label>
              <Col sm={9}>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  className="form-control"
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formTimeSlot">
              <Form.Label column sm={3}>Time Slots:</Form.Label>
              <Col sm={9}>
                <div className="slot-button-group">
                  {timeSlots.map((slot, index) => (
                    <Button
                      key={index}
                      className={`slot-button ${selectedSlots.includes(slot) ? 'selected' : ''} ${bookedSlots.includes(slot) ? 'disabled' : ''}`}
                      onClick={() => handleSlotChange(slot)}
                      disabled={bookedSlots.includes(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formNumberOfMembers">
              <Form.Label column sm={3}>Members:</Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="number"
                  value={numberOfMembers}
                  onChange={e => setNumberOfMembers(e.target.value)}
                  min="1"
                  className="custom-input"
                  required
                />
                <Form.Text className="text-muted">
                  Maximum Members Allowed: {maxMembersPerHour}
                </Form.Text>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="footer-left">
            <span>Total Amount: ₹{calculateTotalAmount()}</span>
          </div>
          <div className="footer-right">
            <Button variant="secondary" onClick={onHide} className="close-button">
              Close
            </Button>
            <Button variant="primary" onClick={handleBooking} className="custom-button">
              Book Now
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingModal;
