import { useState } from "react";
import { useLocation} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../components/payments/CheckoutForm";

import BillingDetailsForm from "../components/payments/BillingDetailsForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutPage = () => {

const location = useLocation();

const [updatedPayload, setUpdatedPayload] = useState(null);

const payload = location.state?.payload;

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
         {/* sending the payload to add more information to it */}

        {/* first we are checking for updatedpayload. then we are checking for clientSecret */}
      {!updatedPayload?.clientSecret ? (
        <BillingDetailsForm payload={payload} onPaymentReady={setUpdatedPayload} /> 
      ) : (
        <Elements stripe={stripePromise} options={{
            clientSecret: updatedPayload.clientSecret,
            appearance: { theme: "flat" }
          }}>
       
          <CheckOutForm payload={updatedPayload}/>
        </Elements>
      )}
    </div>
  );
}

export default CheckoutPage;