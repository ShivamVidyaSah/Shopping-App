import React, { useState } from 'react';
import '../../../styles/coupon/AddCoupon.css';

const AddCoupon = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can replace this with your API call
    console.log('Coupon Code:', code);
    console.log('Discount:', discount);

    setMessage('Coupon created successfully!');
    setCode('');
    setDiscount('');
  };

  return (
    <div className="coupon-container">
      <h2 className="coupon-title">Add Coupon</h2>
      <form className="coupon-form" onSubmit={handleSubmit}>
        <label className="coupon-label">Coupon Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="coupon-input"
          required
        />

        <label className="coupon-label">Discount (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Enter discount"
          className="coupon-input"
          required
        />

        <button type="submit" className="coupon-btn">Create Coupon</button>
        {message && <p className="coupon-msg">{message}</p>}
      </form>
    </div>
  );
};

export default AddCoupon;
