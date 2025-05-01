import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/payments/CheckoutForm";
import axios from "axios";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {

 const location = useLocation();
 const navigate = useNavigate();
 const [clientSecret, setClientSecret] = useState(null);

 const amount = location.state?.amount;

 useEffect(() => {
    if (!amount) {
      // If no amount was passed, redirect back to cart or show error
      navigate("/cart");
      return;
    }

    const CreatePaymentIntent = async() => {
      try{
      const response = await axios.post("http://localhost:4000/create-payment-intent", {amount});
      // console.log(response);
      setClientSecret(response.data.clientSecret);

      }catch(error){
        console.error("Error creating payment intent:", error);
      alert("Something went wrong while initiating payment.");
      navigate("/cart");
      }
    }

    CreatePaymentIntent();

},[amount, navigate]);


  const option = {
    clientSecret,
    appearance: { theme: "flat" },
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h2>Checkout</h2>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={option}>
          <CheckOutForm />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}

export default CheckoutPage;