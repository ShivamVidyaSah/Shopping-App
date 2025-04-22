import React, { useState } from 'react';
import '../../../styles/coupon/AddCoupon.css';
import axios from "axios";
import AllCoupons from './AllCoupon';

const couponIntitialValues = {
  code:"",
  discount:"",
  expiryDate:"",
  usageNumber:0,
}

const AddCoupon = ({onBack}) => {
  
  const [coupon, setCoupon ] = useState(couponIntitialValues);
  const [message, setMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    // You can replace this with your API call
    const payload = {
      ...coupon,
      discount: Number(coupon.discount),
      usageNumber: Number(coupon.usageNumber),
    };
  

    try{
    const response = await axios.post("http://localhost:4000/createcoupon", payload);

      setMessage("Coupon created successfully");

    }catch(error){
      if (error.response && error.response.status === 409) {
        setMessage("Coupon already exists");
      } else {
        setMessage("Something went wrong");
      }
    }
   
    
  };

  return (
   
          <div className="coupon-container">
            <div className='coupon-header'>
              <h2 className="coupon-title">Add Coupon</h2>
              <span className='to-all-coupon'>
                <button className='back-btn' onClick={onBack}>Back</button>
              </span>
            </div>
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
              { message === "Coupon already exists" ? (
              <p className="coupon-msg" style={{color: '#FF0000'}}>{message}</p>
              ) : (
                <p className="coupon-msg">{message}</p>
              )
              }
            </form>
          </div>
     
  );
};

export default AddCoupon;
