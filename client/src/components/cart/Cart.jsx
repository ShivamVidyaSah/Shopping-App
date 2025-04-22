import React, { useState } from 'react';
import { useCart } from '../../context/CartProvider';
import "../../styles/cart/cart.css"

const Cart = () => {

  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [appliedCoupon, setApplyCoupon] = useState(0); // for storing discount
  const [coupon , setCoupon] = useState( {couponcode: ''}); // for storing code
  const [couponMessage, setCouponMessage] = useState(""); // for the message

  const totalPrice = cartItems.reduce(
    (acc, item) => Math.ceil(
      (acc + item.finalPrice * item.quantity) - appliedCoupon),
    0
  );


  const verifyCoupon = async() => {
      try{
          const response = await axios.get('http://localhost:4000/verifycoupon', coupon);
          
      }catch(error){

      }
  } 

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
        <div className='list-header'>
            <ul className="cart-row header-row">
              <li>Item</li>
              <li>Price</li>
              <li>Discount</li>
              <li>Quantity</li>
              <li>Total</li>
            </ul>
        </div>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-row" key={item._id}>
              <div className="cart-item-info">
                <img src={item.image ? `http://localhost:4000${item.image}` : ''} alt={item.name} className="cart-page-img" />
                <span>{item.name}</span>
              </div>
              <span>₹{item.price}</span>
              <span>{item.discount}%</span>
              <input
                type="number"
                className="cart-qty"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  updateQuantity(item._id, parseInt(e.target.value))
                }
              />
                  <span>₹{Math.ceil(item.finalPrice * item.quantity)}</span>
                  <button className="cart-remove" onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              ))}
            </div>
        </>
      )}

      <div className='add-coupon'>
      <label className='coupon-label'>Add Coupon</label>
          <div className='coupon-enter'>
            <input 
              type='text'
              name='couponcode'
              placeholder='Enter Coupon Code'
              value={coupon.couponcode}
              onChange={(e) => setCoupon(prev => ({ [ e.target.name]: e.target.value}))} 
              />
              <span className='coupon-apply' onClick={() => verifyCoupon()}>Apply</span>
          </div>
          { couponMessage === "Invalid Coupon" ? (
              <p className="coupon-msg" style={{color: '#FF0000'}}>{couponMessage}</p>
              ) : (
                <p className="coupon-msg">{couponMessage}</p>
              )
              }
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ₹{totalPrice}</h3>
          <button className="cart-checkout">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
