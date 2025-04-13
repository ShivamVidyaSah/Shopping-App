import React from 'react';

const Cart = ({ cartItems, handleRemove, handleQuantityChange }) => {
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-info">
                <h4 className="cart-name">{item.name}</h4>
                <p className="cart-price">₹{item.price}</p>
                <input
                  type="number"
                  className="cart-qty"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value))
                  }
                />
                <button
                  className="cart-remove"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
