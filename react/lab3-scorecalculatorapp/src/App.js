import React from 'react';
import CalculateScore from './components/CalculateScore';

function App() {
  return (
    <div>
      <h1>Score Calculator App</h1>
      <CalculateScore
        Name="John Doe"
        School="Springfield High"
        Total={850}
        Goal={900}
      />
    </div>
  );
}

export default App;
