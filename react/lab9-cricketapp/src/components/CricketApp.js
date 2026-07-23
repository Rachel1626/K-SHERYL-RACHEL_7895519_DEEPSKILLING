import React, { useState } from 'react';

const teamIndia = [
  { id: 1, name: 'Virat Kohli', role: 'Batsman', runs: 12000, country: 'India' },
  { id: 2, name: 'Rohit Sharma', role: 'Batsman', runs: 9000, country: 'India' },
  { id: 3, name: 'Jasprit Bumrah', role: 'Bowler', wickets: 150, country: 'India' },
  { id: 4, name: 'Ravindra Jadeja', role: 'All-rounder', runs: 2500, wickets: 200, country: 'India' },
  { id: 5, name: 'KL Rahul', role: 'Wicketkeeper', runs: 4000, country: 'India' }
];

const teamOverseas = [
  { id: 6, name: 'Steve Smith', role: 'Batsman', runs: 8000, country: 'Australia' },
  { id: 7, name: 'Kane Williamson', role: 'Batsman', runs: 7000, country: 'New Zealand' },
  { id: 8, name: 'Pat Cummins', role: 'Bowler', wickets: 200, country: 'Australia' },
  { id: 9, name: 'Ben Stokes', role: 'All-rounder', runs: 3500, wickets: 100, country: 'England' },
  { id: 10, name: 'Jos Buttler', role: 'Wicketkeeper', runs: 4500, country: 'England' }
];

const PlayerCard = ({ player }) => {
  const { name, role, runs, wickets, country } = player;
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      backgroundColor: '#f8f9fa',
      width: '220px',
      display: 'inline-block',
      verticalAlign: 'top'
    }}>
      <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{name}</h3>
      <p style={{ margin: '2px 0' }}><strong>Role:</strong> {role}</p>
      <p style={{ margin: '2px 0' }}><strong>Country:</strong> {country}</p>
      {runs !== undefined && <p style={{ margin: '2px 0' }}><strong>Runs:</strong> {runs}</p>}
      {wickets !== undefined && <p style={{ margin: '2px 0' }}><strong>Wickets:</strong> {wickets}</p>}
    </div>
  );
};

const FilterButtons = ({ filterValue, onFilterChange }) => {
  const roles = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper'];
  return (
    <div style={{ marginBottom: '15px' }}>
      <strong>Filter by Role: </strong>
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => onFilterChange(role)}
          style={{
            padding: '6px 14px',
            margin: '0 5px',
            backgroundColor: filterValue === role ? '#007bff' : '#e9ecef',
            color: filterValue === role ? 'white' : '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

function CricketApp() {
  const [filter, setFilter] = useState('All');

  const allPlayers = [...teamIndia, ...teamOverseas];

  const filteredPlayers = filter === 'All'
    ? allPlayers
    : allPlayers.filter((player) => player.role === filter);

  const indianPlayers = teamIndia.map((player) => ({ ...player }));
  const overseasPlayers = teamOverseas.map((player) => ({ ...player }));
  const mergedTeams = [...indianPlayers, ...overseasPlayers];

  return (
    <div>
      <h2>Indian Team</h2>
      <div>
        {teamIndia.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      <h2>Overseas Team</h2>
      <div>
        {teamOverseas.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      <h2>All Players (Merged: {mergedTeams.length})</h2>
      <FilterButtons filterValue={filter} onFilterChange={setFilter} />
      <div>
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}

export default CricketApp;
