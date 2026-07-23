import React, { useContext } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeCard from './EmployeeCard';

function EmployeeList() {
  const { employees } = useContext(EmployeeContext);

  return (
    <div>
      <h2>Employee Directory</h2>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default EmployeeList;
