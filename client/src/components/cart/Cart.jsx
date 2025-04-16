import React from 'react';
import { useCart } from '../../context/CartProvider';
import "../../styles/cart/cart.css"

const Cart = () => {

  const { cartItems, removeFromCart, updateQuantity } = useCart();

  console.log(cartItems);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item[0].finalprice * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item[0].images?.[0]?.url} alt={item.name} className="cart-page-img" />
              <div className="cart-info">
                <h4 className="cart-name">{item[0].name}</h4>
                {console.log(item[0].name)}
                <p className="cart-price">₹{item[0].price}</p>
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
                  onClick={() => removeFromCart(item._id)}
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
