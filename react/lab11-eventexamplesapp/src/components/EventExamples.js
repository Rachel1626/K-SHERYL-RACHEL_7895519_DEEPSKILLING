import React, { useState } from 'react';

function EventExamples() {
  const [count, setCount] = useState(0);
  const [inr, setInr] = useState('');
  const [euro, setEuro] = useState('');

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const sayWelcome = () => {
    alert('Welcome to React Event Examples!');
  };

  const handleClick = (e) => {
    alert('Button clicked! Event type: ' + e.type);
  };

  const convertCurrency = () => {
    const amount = parseFloat(inr);
    if (!isNaN(amount)) {
      setEuro((amount / 90).toFixed(2));
    } else {
      alert('Please enter a valid number');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Event Examples App</h1>

      <h2>Counter</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>

      <h2>Say Welcome</h2>
      <button onClick={sayWelcome}>Say Welcome</button>

      <h2>Click on Me</h2>
      <button onClick={handleClick}>Click on Me</button>

      <h2>Currency Converter (INR to Euro)</h2>
      <input
        type="number"
        placeholder="Enter amount in INR"
        value={inr}
        onChange={(e) => setInr(e.target.value)}
      />
      <button onClick={convertCurrency}>Convert</button>
      {euro && <p>{inr} INR = {euro} EUR</p>}
    </div>
  );
}

export default EventExamples;
