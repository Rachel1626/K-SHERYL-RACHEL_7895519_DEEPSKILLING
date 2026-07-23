import React from 'react';

function CohortDetails({ name, status, students }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', margin: '10px' }}>
      <h2>{name}</h2>
      <p>Status: <span style={{ color: status === 'Ongoing' ? 'green' : 'blue' }}>{status}</span></p>
      <p>Total Students: {students}</p>
    </div>
  );
}

CohortDetails.defaultProps = {
  name: 'Default Cohort',
  status: 'Upcoming',
  students: 0
};

export default CohortDetails;
