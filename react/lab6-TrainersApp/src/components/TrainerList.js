import React from 'react';
import { Link } from 'react-router-dom';

const trainers = [
  { id: 1, name: 'Amit Sharma', email: 'amit@example.com', phone: '9876543210', technology: 'React', skills: ['JavaScript', 'Redux', 'Node.js'] },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', technology: 'Angular', skills: ['TypeScript', 'RxJS', 'NgRx'] },
  { id: 3, name: 'Rahul Verma', email: 'rahul@example.com', phone: '9876543212', technology: 'Python', skills: ['Django', 'Flask', 'Machine Learning'] },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', phone: '9876543213', technology: 'Java', skills: ['Spring Boot', 'Hibernate', 'Microservices'] },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543214', technology: 'DevOps', skills: ['Docker', 'Kubernetes', 'Jenkins'] }
];

function TrainerList() {
  return (
    <div>
      <h1>Trainer List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Technology</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id} style={{ backgroundColor: trainer.id % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{trainer.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{trainer.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{trainer.technology}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <Link to={`/trainers/${trainer.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainerList;
export { trainers };
