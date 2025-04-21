import axios from "axios";
import { useEffect, useState } from "react";
import '../../../styles/coupon/AllCoupons.css'
import AddCoupon from "./Addcoupon";

const AllCoupons = () => {
    const [allCoupons, setAllCoupons] = useState([]);
    const [displayAddCoupon, setDisplayAddCoupon] = useState(false);
    const message = "No coupons to display";
  
    useEffect(() => {
      const getAllCoupons = async () => {
        try {
          const response = await axios.get('http://localhost:4000/getcoupons');
          if (response.status === 200) {
            setAllCoupons(response.data);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getAllCoupons();
    }, []);
  
    const deleteCoupon = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:4000/deletecoupon/${id}`);
            if(response.status === 200){
              setAllCoupons(allCoupons.filter(coupon => coupon._id != id))
            }
        }catch(error){
          console.log(error.message);
        }
    };
  
    if (displayAddCoupon) return <AddCoupon onBack={() => setDisplayAddCoupon(false)} />;
  
    return (
      <div className="coupon-container">
        <h2 className="coupon-title">All Coupons</h2>
        {allCoupons.length === 0 ? (
          <p className="coupon-empty">{message}</p>
        ) : (
          <>
            <div className='coupon-list-header'>
              <ul className="coupon-row header-row">
                <li>Code</li>
                <li>Discount</li>
                <li>Expiry</li>
                <li>Usage</li>
                <li className="action-col">Action</li>
              </ul>
            </div>
            <div className="coupons-items">
              {allCoupons.map((coupon) => (
                <ul className="coupon-row" key={coupon._id}>
                  <li>{coupon.code}</li>
                  <li>{coupon.discount}</li>
                  <li>{new Date(coupon.expiryDate).toLocaleDateString()}</li>
                  <li>{coupon.usageNumber}</li>
                  <li className="action-col">
                    <button
                      className="coupon-delete-btn"
                      onClick={() => deleteCoupon(coupon._id)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              ))}
            </div>
          </>
        )}
  
        <div className="coupon-footer">
          <button className="coupon-add-btn" onClick={() => setDisplayAddCoupon(true)}>
            + Add New Coupon
          </button>
        </div>
      </div>
    );
  };
  
  export default AllCoupons;
  