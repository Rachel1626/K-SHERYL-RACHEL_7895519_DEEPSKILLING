import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Trainers App</h1>
      <p>This application manages trainer information.</p>
      <Link to="/trainers" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        View All Trainers
      </Link>
    </div>
  );
}

export default Home;
