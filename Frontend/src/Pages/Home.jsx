import React from 'react';
import TurfCard from '../components/TurfCard';
import { Container } from '@mui/material';

const Home = ({ turfs }) => {
  return (
    <Container>
    <div className="home-page">
      <h1>Welcome to Turf Booking</h1>
      <div className="turf-list">
        {turfs.map((turf, index) => (
          <TurfCard
            key={index}
            image={turf.image}
            title={turf.title}
            rating={turf.rating}
            address={turf.address}
            services={turf.services}
            phone={turf.phone}
          />
        ))}
      </div>
    </div>
    </Container>
  );
}

export default Home;
