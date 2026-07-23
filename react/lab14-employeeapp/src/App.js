import React from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <EmployeeProvider>
      <div style={{ padding: '20px' }}>
        <h1>Employee App (Context API)</h1>
        <EmployeeList />
      </div>
    </EmployeeProvider>
  );
}

export default App;
