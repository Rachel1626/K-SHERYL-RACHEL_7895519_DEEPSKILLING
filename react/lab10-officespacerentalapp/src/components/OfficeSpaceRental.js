import React from 'react';

const offices = [
  {
    id: 1,
    name: 'Tech Hub Workspace',
    rent: 45000,
    address: '123 MG Road, Bangalore, Karnataka - 560001',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400'
  },
  {
    id: 2,
    name: 'Downtown Business Center',
    rent: 75000,
    address: '456 Nehru Place, New Delhi - 110019',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400'
  },
  {
    id: 3,
    name: 'Green Valley Office',
    rent: 58000,
    address: '789 Bandra West, Mumbai, Maharashtra - 400050',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400'
  },
  {
    id: 4,
    name: 'Skyline Tower Suite',
    rent: 92000,
    address: '321 Salt Lake Sector V, Kolkata - 700091',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400'
  }
];

const OfficeCard = ({ office }) => {
  const { name, rent, address, image } = office;

  const rentColor = rent < 60000 ? '#dc3545' : '#28a745';
  const rentBgColor = rent < 60000 ? '#f8d7da' : '#d4edda';

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '10px',
      overflow: 'hidden',
      width: '350px',
      margin: '15px',
      display: 'inline-block',
      verticalAlign: 'top',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{name}</h3>
        <p style={{ margin: '5px 0', color: '#555' }}>
          <strong>Address:</strong> {address}
        </p>
        <div style={{
          display: 'inline-block',
          padding: '5px 15px',
          backgroundColor: rentBgColor,
          color: rentColor,
          borderRadius: '20px',
          fontWeight: 'bold',
          marginTop: '10px'
        }}>
          Rent: &#8377;{rent.toLocaleString()}/month
        </div>
      </div>
    </div>
  );
};

function OfficeSpaceRental() {
  return (
    <div>
      <h2>Available Office Spaces</h2>
      <p>Offices with rent below &#8377;60,000 shown in <span style={{ color: '#dc3545', fontWeight: 'bold' }}>Red</span>, above or equal in <span style={{ color: '#28a745', fontWeight: 'bold' }}>Green</span></p>
      <div>
        {offices.map((office) => (
          <OfficeCard key={office.id} office={office} />
        ))}
      </div>
    </div>
  );
}

export default OfficeSpaceRental;
