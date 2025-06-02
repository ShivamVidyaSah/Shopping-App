import React from "react";
import "../styles/home.css"
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
     {/* <Navbar/> */}
      
      {/* Hero Section */}
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button onClick={()=> navigate('/shop')}>Shop Now</button>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
            <img className="fe-img" src="/icon-assets/free-shipping.webp"  alt="free-shipping"/>
            <h6 className="fe-tagline">Free Shipping</h6>
        </div>
        <div className="fe-box">
            <img className="fe-img" src="/icon-assets/online-order.png"  alt="free-shipping"/>
            <h6 className="fe-tagline">Online Order</h6>
        </div>
        <div className="fe-box">
            <img className="fe-img" src="/icon-assets/save-money.png" alt="free-shipping"/>
            <h6 className="fe-tagline">Save Money</h6>
        </div>
        <div className="fe-box">
            <img className="fe-img" src="/icon-assets/promo.png"  alt="free-shipping"/>
            <h6 className="fe-tagline">Promotions</h6>
        </div>
        <div className="fe-box">
            <img className="fe-img" src="/icon-assets/happy-cus.webp" alt="free-shipping"/>
            <h6 className="fe-tagline">Happy Sell</h6>
        </div>
        <div className="fe-box">
            <img className="fe-img" src="/icon-assets/service2.jpg" alt="free-shipping"/>
            <h6 className="fe-tagline">F24/7 Support</h6>
        </div>
    </section>
      
      {/* Featured Products */}
      <section id="product1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container">
          {["1", "2", "3", "4"].map((num) => (
            <div className="pro" key={num}>
              <img src={`img/products/f${num}.jpg`} alt={`Product ${num}`} />
              <div className="des">
                <span>adidas</span>
                <h5>Comming soon</h5>
                <div className="star">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <h4>₹{num === "1" ? 599 : num === "2" ? 1999 : num === "3" ? 2199 : 4999}</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart"></i></a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
