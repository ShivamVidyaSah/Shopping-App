import { useState, useEffect } from "react";
import "../../styles/product/viewproduct.css"
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/ContextProvider";


const ProductPage = () => {

    // const [product]

    const role = sessionStorage.getItem("role");

    const location = useLocation();
    const { product } = location.state || {};

    const [ isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const { addToCart } = useCart();
    

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    }

    const handleBuyNow = () => {

    }

    const handleAddToCart = () => {
            addToCart(product);
            setAdded(true);
    }

    const sendtoEditpage = () => {

    }

    useEffect(() => {
        const timeout = setTimeout(() => setAdded(false), 3000);
        return () => clearTimeout(timeout);
      }, [added]);
      

    return (
        <div className="product-page-container">

            {/* left side of the project - Project image */}
            <div className="product-image-section">
                    <img src={`http://localhost:4000${product.images?.[0]?.url}`} alt="Product Image"/>
            </div>
            
            {/* right side - product details */}
            <div className="product-details-section">

            {/* Only customer are allowed to add to wishlist */}
           { (role === "Customer")?
            <div className="wishlist-button" onClick={toggleWishlist}>
            {isWishlisted ? "❤️" : "🤍"}
            </div>: null}

                <h1 className="product-title">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-stock">Stock left:- {product.stock}</p>
                <p className="product-size-available">{product.size}</p>
                <div className="quantity-selector">
                    <button onClick={() => setQuantity(q => Math.max(1,q-1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock,q+1))}>+</button>

                </div>

                <h2 className="product-price">${product.finalPrice}</h2>

                {(product.stock > 0 && role === "Customer")?
                <div className="product-buttons">
                    <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
                    {added ? 
                    <button className="add-to-cart-button" >Added</button>
                        :
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                    }
                </div>: 
                <></>
               } 

               {(product.stock <= 0 && role !== "Admin")?
                <div className="display-stock">
                    <div className="out-of-stock" disabled>Out Of Stock</div>
                </div>:
                <></>}
               
               {(role === "Admin")?
               <div className="product-buttons">
                    <button className="edit-product-button" onClick={sendtoEditpage}>Edit Product</button>
                </div>: null}




            </div>
        </div>
    )
}

export default ProductPage;