import React from 'react';

function User() {
  return (
    <div>
      <h2>Welcome, User!</h2>
      <h3>Book Tickets</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert('Ticket Booked Successfully!'); }}>
        <div>
          <label>Flight: </label>
          <select>
            <option>Flight 101 - New York to London</option>
            <option>Flight 202 - Delhi to Dubai</option>
            <option>Flight 303 - Tokyo to Sydney</option>
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Passenger Name: </label>
          <input type="text" required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Number of Tickets: </label>
          <input type="number" min="1" defaultValue="1" />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Book Now</button>
      </form>
    </div>
  );
}

export default User;
