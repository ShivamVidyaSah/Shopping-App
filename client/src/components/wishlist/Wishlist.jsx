import React from 'react';
import '../../styles/wishlist/wishlist.css';
import { useCart } from '../../context/ContextProvider';


// wishlistItems, removeFromWishlist, addToCart

const Wishlist = () => {

  const {wishlistItems, removeFromWishlist, addToCart} = useCart();

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div className="wishlist-card" key={item._id}>
              <img src={item.images[0].url ? `http://localhost:4000${item.images[0].url}` : ''} alt={item.name} className="wishlist-image" />
              <div className="wishlist-details">
                <h3 className="wishlist-name">{item.name}</h3>
                <p className="wishlist-price">${item.price}</p>
                <div className="wishlist-actions">
                  <button 
                    className="wishlist-btn add-to-cart-btn" 
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="wishlist-btn remove-btn" 
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
