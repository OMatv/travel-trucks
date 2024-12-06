import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Camper Rentals!</h1>
      <p>
        Explore our wide range of campers for your next adventure. Choose the perfect one for your
        trip!
      </p>
      <Link to="/catalog">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          View Our Campers
        </button>
      </Link>
    </div>
  );
};

export default Home;