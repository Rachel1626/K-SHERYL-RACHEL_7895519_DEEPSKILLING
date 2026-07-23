import React, { createContext } from 'react';

const EmployeeContext = createContext();

const employees = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', role: 'Frontend Developer' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', role: 'Marketing Manager' },
  { id: 3, name: 'Charlie Brown', department: 'Engineering', role: 'Backend Developer' },
  { id: 4, name: 'Diana Ross', department: 'HR', role: 'HR Specialist' },
  { id: 5, name: 'Edward Norton', department: 'Finance', role: 'Financial Analyst' },
];

function EmployeeProvider({ children }) {
  return (
    <EmployeeContext.Provider value={{ employees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export { EmployeeContext, EmployeeProvider };
