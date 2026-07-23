import React from 'react';
import CohortDetails from './components/CohortDetails';
function App() {
  return (
    <div style={{padding: '20px'}}>
      <h1>Cohort Details - Unit Testing</h1>
      <CohortDetails name="Cohort 2024" status="Ongoing" students={30} />
      <CohortDetails name="Cohort 2025" status="Completed" students={25} />
      <CohortDetails />
    </div>
  );
}
export default App;
