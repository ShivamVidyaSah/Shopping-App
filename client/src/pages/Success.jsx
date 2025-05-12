// src/pages/Success.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState(null);
    const [error,setError] = useState(null);

    const orderId = searchParams.get("order_id");
    const paymentIntentId = searchParams.get("payment_intent");

    useEffect(()=>{

        const confirmOrder = async() => {
          try{

            const res = await axios.post("http://localhost:4000/confirm-payment", {
              orderId,
              paymentIntentId,
            });

            setOrderDetails(res.data.order);

          }catch(error){
            setError("Something went wrong while confirming your order.");
            console.error(err);
          }finally{
              setLoading(false);
          }
        }

        if (orderId && paymentIntentId) {
          confirmOrder();
        } else {
          setError("Missing order information.");
          setLoading(false);
        }

    },[orderId,paymentIntentId])

    if (loading) {
      return <p style={{ textAlign: "center", marginTop: "100px" }}>Processing your order...</p>;
    }
  
    if (error) {
      return <p style={{ textAlign: "center", marginTop: "100px", color: "red" }}>{error}</p>;
    }


    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>🎉 Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p><strong>Order ID:</strong> {orderDetails._id}</p>
        <p><strong>Status:</strong> {orderDetails.status}</p>
        <p><strong>Shipping Name:</strong> {orderDetails.shipping.name}</p>
      </div>
    );
  };
  
  export default Success;
  