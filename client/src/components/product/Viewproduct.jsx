import { useState } from "react";
import "../../styles/product/viewproduct.css"
import { useLocation } from "react-router-dom";


const ProductPage = () => {

    // const [product]

    const location = useLocation();
    const { product } = location.state || {};

    const [ isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted);
    }

    const handleBuyNow = () => {

    }

    const handleAddToCart = () => {

    }

    return (
        <div className="product-page-container">

            {/* left side of the project - Project image */}
            <div className="product-image-section">
                    <img src={`http://localhost:4000${product.images?.[0]?.url}`} alt="Product Image"/>
            </div>
            
            {/* right side - product details */}
            <div className="product-details-section">

            <div className="wishlist-button" onClick={toggleWishlist}>
            {isWishlisted ? "❤️" : "🤍"}
            </div>

                <h1 className="product-title">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-stock">{product.stock}</p>
                <h2 className="product-price">${product.price}</h2>

                <div className="product-buttons">
                    <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                </div>


            </div>
        </div>
    )
}

export default ProductPage;