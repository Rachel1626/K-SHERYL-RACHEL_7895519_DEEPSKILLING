import React, { useState } from 'react';
import Guest from './Guest';
import User from './User';

function TicketBooking() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ticket Booking App</h1>
      <button onClick={isLoggedIn ? logout : login}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
      <hr />
      {isLoggedIn ? <User /> : <Guest />}
    </div>
  );
}

export default TicketBooking;
