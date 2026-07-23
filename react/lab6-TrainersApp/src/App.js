import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TrainerList from './components/TrainerList';
import TrainerDetail from './components/TrainerDetail';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
        <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
        <Link to="/trainers" style={{ color: 'white', textDecoration: 'none' }}>Trainers</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainers" element={<TrainerList />} />
        <Route path="/trainers/:id" element={<TrainerDetail />} />
      </Routes>
    </div>
  );
}

export default App;
