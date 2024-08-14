// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TurfCard from './components/TurfCard';
import turfData from './components/TurfData.jsx';
import ContactUs from './components/ContactUs';
import Advertise from './components/Advertise';
import Admin from './components/Admin';
import MarriageHalls from './Pages/MarriageHalls.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [turfType, setTurfType] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <NavBar setLocation={setLocation} setTurfType={setTurfType} setRatingFilter={setRatingFilter} />
                <TurfCard location={location} turfType={turfType} ratingFilter={ratingFilter} />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/home" 
            element={
              <>
                <NavBar setLocation={setLocation} setTurfType={setTurfType} setRatingFilter={setRatingFilter} />
                <TurfCard location={location} turfType={turfType} ratingFilter={ratingFilter} />
                <Footer />
              </>
            } 
          />
          <Route path="/contact-us" element={<><NavBar setLocation={setLocation} setTurfType={setTurfType} setRatingFilter={setRatingFilter} /><ContactUs /><Footer /></>} />
          <Route path="/advertise" element={<><NavBar setLocation={setLocation} setTurfType={setTurfType} setRatingFilter={setRatingFilter} /><Advertise /><Footer /></>} />
          <Route path="/admin" element={<><NavBar setLocation={setLocation} setTurfType={setTurfType} setRatingFilter={setRatingFilter} /><Admin initialTurfData={turfData} /><Footer /></>} />
          <Route path="/marriage-halls" element={<><NavBar setLocation={setLocation} setTurfType={setTurfType} setRatingFilter={setRatingFilter} /><MarriageHalls /><Footer /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
