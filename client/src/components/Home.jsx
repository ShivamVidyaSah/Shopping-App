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

      {/* discount banner */}
      <section id="banner" className="section-m1">
        <h4>Repair Service</h4>
        <h2>Up to <span>65% 0ff</span> - End of Seaon</h2>
        <button className="normal">Know More</button>
    </section>

    {/* new arrival */}
    <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Never leave what's Trending</p>
        <div className="pro-container">
            <div className="pro">
                <img src="img/new-arr1.jpg" alt="product-1"/>
                <div className="des">
                    <span>Integrity</span>
                    <h5>Comming soon</h5>
                    <div className="star">
                        <i className="fas fa-star" aria-hidden="true"></i>
                        <i className="fas fa-star" aria-hidden="true"></i>
                        <i className="fas fa-star" aria-hidden="true"></i>
                        <i className="fas fa-star" aria-hidden="true"></i>
                        <i className="fas fa-star" aria-hidden="true"></i>
                    </div>
                    <h4>₹1499</h4>
                </div>
                <a href=""><i className="fal fa-shopping-cart cart" aria-hidden="true"></i></a>
            </div>
           
        </div>
      </section>

      {/* banner */}
      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
            <h4>Mindblowing deals</h4>
            <h2>Buy 1 get 1 free </h2>
            <span>Grab the best of Demin</span>
            <button className="white">Explore</button>
        </div>

        <div className="banner-box banner-box2">
            <h4>spring/summer</h4>
            <h2> Upcomming Season</h2>
            <span>Be the first to get your hands on</span>
            <button className="white">Have a look</button>
        </div>
      </section>

    {/* // small banner */}
      <section id="banner3">
        <div className="banner-box ">
            <h2>What's Trending</h2>
            <h3>Pick your style</h3>
        </div>
        <div className="banner-box banner-box2 ">
            <h2>Weddings</h2>
            <h3>Best of Indian Collection</h3>
        </div>
        <div className="banner-box banner-box3 ">
            <h2>Regulars</h2>
            <h3>Best of Comfort</h3>
        </div>
      </section>

      <section id="newletter" className="section-p1 section-m1">
        <div className="newstext">
            <h4>Sign up for Regular Updates</h4>
            <p>Get E-mail updates on <span>latest trends, new arrivals and special offers</span></p>
        </div>
        <div className="form">
            <input type="text" placeholder="Your email address"/>
            <button className="normal">Sign Up</button>
        </div>
      </section>

      <footer className="section-p1">
          <div className="col">
              <img className="logo" src="/img-assets/logo2.png" alt=""/>
              <h4>Contact</h4>
              <p><strong>Address:</strong> Hatiberia, ICARE Complex, Dist, Haldia, West Bengal 721657</p>
              <p><strong>Phone:</strong>+91 9903759222</p>
              <p><strong>Hours:</strong>10.00 AM - 18.00 PM, Mon - Sat</p>
              <div className="follow">
                  <h4>Follow Us</h4>
                  <div className="icon">
                      <i className="fab fa-facebook-f" aria-hidden="true"></i>
                      <i className="fab fa-instagram" aria-hidden="true"></i>
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                      <i className="fab fa-whatsapp" aria-hidden="true"></i>
                  </div>
              </div>
          </div>

          <div className="col">
              <h4>About</h4>
              <a href="#">About Us</a>
              <a href="#">Delievery Information</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Condition</a>
              <a href="#">Contact Us</a>
          </div>

          <div className="col">
              <h4>Account</h4>
              <a href="login.html">Sign In</a>
              <a href="#">View Cart</a>
              <a href="#">My Wishlist</a>
              <a href="#">Track Order</a>
              <a href="#">Help</a>
          </div>

          <div className="col install">
              <h4>Install App</h4>
              <p>From App Store or Google Play</p>
              <div className="row">
                  <img src="/img-assets/app-store.png" alt=""/>
                  <img src="/img-assets/google-play.png" alt=""/>
              </div>
              <p>Payment Gateway</p>
              <img className="pay" src="/img-assets/pay.webp" alt=""/>
          </div>


          <div className="copyright">
              <p>@Made with <i className="fa fa-heart" style={{color:'red'}} aria-hidden="true"></i> by Shivam. All right reserved</p>
          </div>
      </footer>
</div>
  );
};

export default Home;
