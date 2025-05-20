import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const OrderDetails = () => {

    const {orderId} = useParams();
    const [order, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchOrder = async() => {

          try{
            const response = await axios.get(`http://localhost:4000/order/${orderId}`);
            setOrders(response.data.order);
          }catch(error){
                    console.error("Error fetching order:", err);
          }finally{
            setLoading(false);
          }

        }

        fetchOrder();
    },[orderId]);

    return(
         <div className="order-details-container">
      {/* Product List Section */}
      <div className="product-list">
        {order.items.map(item => (
          <div key={item.productId} className="product-card">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${(item.price / 100).toFixed(2)}</p>
              <p>Total: ${(item.quantity * item.price / 100).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
      <div className="order-summary-section">
        <div className="shipping-info">
          <h4>Shipping Details</h4>
          {/* show shipping.name, address, etc */}
        </div>

        <div className="payment-info">
          <h4>Payment Summary</h4>
          {/* show amount, coupon, status, method, etc */}
        </div>
      </div>

      {/* Download Invoice */}
      <button >Download Invoice</button>
    </div>
    )
}

export default OrderDetails;