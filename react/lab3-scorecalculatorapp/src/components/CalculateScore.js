import React from 'react';

function CalculateScore({ Name, School, Total, Goal }) {
  const average = Total / 4;

  return (
    <div>
      <h2>Student Score Report</h2>
      <p><strong>Name:</strong> {Name}</p>
      <p><strong>School:</strong> {School}</p>
      <p><strong>Total Score:</strong> {Total}</p>
      <p><strong>Goal:</strong> {Goal}</p>
      <p><strong>Average Score:</strong> {average.toFixed(2)}</p>
      {average >= Goal / 4 ? (
        <p style={{ color: 'green' }}>Goal Achieved!</p>
      ) : (
        <p style={{ color: 'red' }}>Keep Working Towards Your Goal!</p>
      )}
    </div>
  );
}

export default CalculateScore;
