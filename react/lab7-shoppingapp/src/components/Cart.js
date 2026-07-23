import React from 'react';

function Cart({ items }) {
  if (!items || items.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '5px' }}>
        <p style={{ margin: 0, color: '#856404' }}>Your cart is empty. Add some products!</p>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#17a2b8', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Item Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price (INR)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>&#8377;{item.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: '#dee2e6', fontWeight: 'bold' }}>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>Total</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>&#8377;{total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

Cart.defaultProps = {
  items: []
};

export default Cart;
