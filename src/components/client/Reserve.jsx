// src/components/client/Reserve.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Reserve() {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reserve Parking Spot #{id}</h2>
      <p>Please fill in the details below to reserve this parking spot.</p>
      
      {/* Example reservation form */}
      <form>
        <div>
          <label>Name: </label><br />
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Email: </label><br />
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Reservation Date: </label><br />
          <input type="date" name="date" required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <button type="submit">Confirm Reservation</button>
        </div>
      </form>
    </div>
  );
}
