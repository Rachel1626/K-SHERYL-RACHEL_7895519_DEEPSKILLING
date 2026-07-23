import React from 'react';

function EmployeeCard({ employee }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h3>{employee.name}</h3>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Role:</strong> {employee.role}</p>
    </div>
  );
}

export default EmployeeCard;
