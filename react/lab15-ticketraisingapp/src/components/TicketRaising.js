import React, { useState } from 'react';

function TicketRaising() {
  const [name, setName] = useState('');
  const [complaint, setComplaint] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = 'TKT-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setReferenceNumber(ref);
    alert('Ticket raised successfully!\nReference Number: ' + ref);
    setName('');
    setComplaint('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ticket Raising App</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Employee Name: </label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '300px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Complaint: </label>
          <br />
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
            rows="5"
            cols="40"
          />
        </div>
        <button type="submit">Submit Ticket</button>
      </form>

      {referenceNumber && (
        <div style={{ marginTop: '20px', padding: '10px', border: '2px solid green', borderRadius: '5px' }}>
          <h3>Ticket Submitted Successfully!</h3>
          <p><strong>Reference Number:</strong> {referenceNumber}</p>
        </div>
      )}
    </div>
  );
}

export default TicketRaising;
