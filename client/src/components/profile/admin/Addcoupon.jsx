import React, { useState } from 'react';
import '../../../styles/coupon/AddCoupon.css';
import axios from "axios";

const couponIntitialValues = {
  code:"",
  discount:"",
  expiryDate:"",
  usageNumber:"",
}

const AddCoupon = () => {
  // const [code, setCode] = useState('');
  // const [discount, setDiscount] = useState('');
  const [coupon, setCoupon ] = useState(couponIntitialValues);
  const [message, setMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    // You can replace this with your API call
    console.log('Coupon:', coupon);

    try{
    const response = axios.post("http://localhost:4000/createcoupon",coupon);

    }catch(error){
      
    }
    setMessage('Coupon created successfully!');
    
  };

  return (
    <div className="coupon-container">
      <h2 className="coupon-title">Add Coupon</h2>
      <form className="coupon-form" onSubmit={handleSubmit}>
        <label className="coupon-label">Coupon Code</label>
        <input
        name="code"
          type="text"
          value={coupon.code}
          onChange={(e) => setCoupon((prev) => ({...prev,[e.target.name]:e.target.value}))}
          placeholder="Enter code"
          className="coupon-input"
          required
        />

        <label className="coupon-label">Discount (%)</label>
        <input
        name="discount"
          type="number"
          value={coupon.discount}
          onChange={(e) => setCoupon((prev) => ({...prev,[e.target.name]:e.target.value}))}
          placeholder="Enter discount"
          className="coupon-input"
          required
        />

        <label className="coupon-label">Number of Use</label>
        <input
        name="usageNumber"
          type="number"
          value={coupon.usageNumber}
          onChange={(e) => setCoupon((prev) => ({...prev,[e.target.name]:e.target.value}))}
          placeholder="Enter Usage limit"
          className="coupon-input"
          required
        />

        <label className="coupon-label">Enter Expiry Date</label>
        <input
        name="expiryDate"
          type="date"
          value={coupon.expiryDate}
          onChange={(e) => setCoupon((prev) => ({...prev,[e.target.name]:e.target.value}))}
          placeholder="Enter Usage limit"
          className="coupon-input"
          required
        />

        <button type="submit" className="coupon-btn" >Create Coupon</button>
        {message && <p className="coupon-msg">{message}</p>}
      </form>
    </div>
  );
};

export default AddCoupon;
