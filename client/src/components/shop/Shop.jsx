import { Link } from "react-router-dom";
import "../../styles/shop.css";
import heroImage from "../../assets/shop-page-banner.jpg";
import { useEffect } from "react";

const Shop = () => {

    const userrole = sessionStorage.getItem("role");

    useEffect
    const product = async() => {

    }


    return (
       
        <>
            <div id="page-header"  style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="Shade" >
                
                
                <h2>Pick your Style</h2>
            
                <p>Save more with coupons & up to 70% off! </p>
                </div>
            </div>

           { userrole === "admin"? 
            (<div>
                <button>Add Product</button>
            </div>)
            : null
            }
            
            <div id="product1" className="section-p1">
                    
                    <div className="pro-container">
                        <div className="pro" onClick="">
                            <img src="img/product1.jpg" alt="product-1"/>
                            <div className="des">
                                <span>Integrity</span>
                                <h5>Comming soon</h5>
                                <div className="star">
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                </div>
                                <h4>₹1599</h4>
                            </div>
                            <Link to="" ><i className="fal fa-shopping-cart cart"></i></Link>
                        </div>
                    </div>
            </div> 

            {/* <section id="pagination" className="section-p1">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#"><i className="fal fa-long-arrow-alt-right"></i></a>
            </section> */}
        </>
  
    )
}

export default Shop;