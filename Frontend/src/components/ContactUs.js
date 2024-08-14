import React, { useState } from 'react';
import './ContactUs.css'; // Ensure the path is correct
import logo from './images/logo1.jpeg';

function ContactUs() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission, e.g., sending data to a server
    alert(`Email: ${email}\nFeedback: ${feedback}`);
  };

  return (
    <div className="contact-us">
      <div className="contact-us-left">
        <img src={logo} alt="Logo" className="contact-logo" />
      </div>
      <div className="contact-us-right">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vel
          dapibus consequat, odio mi posuere sapien, nec feugiat justo erat a magna.
          Duis convallis velit et augue vehicula, in egestas orci scelerisque. Nullam
          malesuada vestibulum ante non eleifend. Integer euismod libero nec nisi aliquet,
          eu pharetra lacus iaculis.
        </p>
        <p>
          Curabitur vitae nisi nec felis dapibus congue. Cras et ligula a elit tempus
          tincidunt eget in ligula. Fusce lobortis bibendum nisi, nec feugiat sem.
          Suspendisse potenti. Phasellus convallis eros ut leo lacinia, ut posuere erat
          sollicitudin. In id volutpat nisi. Vivamus tincidunt est eu neque eleifend,
          sed convallis justo aliquet.
        </p>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
