import React from 'react';
import Cart from './Cart';

const products = [
  { name: 'Laptop', price: 54999 },
  { name: 'Headphones', price: 1299 },
  { name: 'Keyboard', price: 2499 },
  { name: 'Mouse', price: 799 },
  { name: 'Monitor', price: 18999 }
];

function OnlineShopping() {
  return (
    <div>
      <h2>Available Products</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#28a745', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price (INR)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>&#8377;{product.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Shopping Cart</h2>
      <Cart items={products} />
    </div>
  );
}

export default OnlineShopping;
