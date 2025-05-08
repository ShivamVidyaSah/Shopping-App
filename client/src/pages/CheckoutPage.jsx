import { useState } from "react";
import { useLocation} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/payments/CheckoutForm";

import BillingDetailsForm from "../components/payments/BillingDetailsForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {

const location = useLocation();

const [clientSecret, setClientSecret] = useState(null);

const payload = location.state?.payload;

//const [finalPayload, setFinalPayload] = useState(payload);
console.log(payload);

  const option = {
    clientSecret,
    appearance: { theme: "flat" },
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
         {/* sending the payload to add more information to it */}

      {!clientSecret ? (
        <BillingDetailsForm payload={payload} onPaymentReady={setClientSecret} /> 
      ) : (
        <Elements stripe={stripePromise} options={option}>
        {console.log({payload})}
          <CheckOutForm payload={payload}/>
        </Elements>
      )}
    </div>
  );
}

export default CheckoutPage;