import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { trainers } from './TrainerList';

function TrainerDetail() {
  const { id } = useParams();
  const trainer = trainers.find((t) => t.id === parseInt(id));

  if (!trainer) {
    return (
      <div>
        <h1>Trainer Not Found</h1>
        <Link to="/trainers">Back to Trainers List</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h1>Trainer Details</h1>
      <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '20px' }}>
        <p><strong>ID:</strong> {trainer.id}</p>
        <p><strong>Name:</strong> {trainer.name}</p>
        <p><strong>Email:</strong> {trainer.email}</p>
        <p><strong>Phone:</strong> {trainer.phone}</p>
        <p><strong>Technology:</strong> {trainer.technology}</p>
        <p><strong>Skills:</strong></p>
        <ul>
          {trainer.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <br />
      <Link to="/trainers" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Back to Trainers List
      </Link>
    </div>
  );
}

export default TrainerDetail;
