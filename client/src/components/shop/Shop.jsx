import { Link } from "react-router-dom";
import "../../styles/shop.css";
import heroImage from "../../assets/shop-page-banner.jpg";
import { useState,useEffect } from "react";
import axios from "axios";

const Shop = () => {

    const [ products, setProducts] = useState([]);

    useEffect(()=>{
    const fetchProduct = async() => {
            try{
                const response = await axios.get('http://localhost:4000/getallproducts')
    
                if(response.status === 200){
                    console.log(response.data);
                    setProducts(response.data);
                }
    
            }catch(error){
                return console.log(error);
            }
        
    }

    fetchProduct();
    
    },[])

    return (
       
        <>
            <div id="page-header"  style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="Shade" >
                
                
                <h2>Pick your Style</h2>
            
                <p>Save more with coupons & up to 70% off! </p>
                </div>
            </div>

            
            <div id="product1" className="section-p1">

                <div className="pro-container"  >
                    {products.length > 0 ? 
                        ( products.map((product)=>(
                        
                        <div className="pro" key={product._id} onClick={()=> toProductPage(product._id)}>
                            {/* Redirecting it to the page where the product will be displayed like a product display page */}
                            <img src={`http://localhost:4000${product.images?.[0]?.url}`} alt="product-1"/>
                            {/* ?. (Optional Chaining) → This ensures that if images is undefined or null, 
                            JavaScript won't throw an error and will just return undefined. */}
                            <div className="des">
                                <span>{product.category}</span>
                                <h5>{product.name}</h5>
                                <div className="star">
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                    <i className="fas fa-star" ></i>
                                </div>
                                <h4>${product.finalPrice}</h4> {/* add how much discount is getting applied  */}
                            </div>
                            <Link to="" ><i className="fal fa-shopping-cart cart"></i></Link>
                        </div>
                         )) ):(
                            <div>
                                <p>No products to display</p>
                            </div>
                        )
                        }

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