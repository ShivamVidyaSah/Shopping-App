
import {useStripe, useElements , PaymentElement } from  '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckOutForm = () => {

    const stripe = useStripe();
    const element = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {

        e.preventDefault();

        if(!stripe || !element) return;

        setLoading(true);

        const { error } = await stripe.confirmPayment({
        element,
        confirmParams: {
            return_url: "http://localhost:5173/success", // after payment
        },
        });

        if (error) {
        alert(error.message);
        setLoading(false);

    }
}

    return(
        <form onSubmit={handleSubmit} style={{textAlign:"right"}}>
            < PaymentElement/>
            {/* Element components allow you to securely collect payment 
            information in your React app and place the Elements wherever 
            you want on your checkout page. You can also customize the appearance. */}
                <button disabled={!stripe || loading} style={
                    {marginTop:10, width:90, height:40, 
                     border:"none" ,borderRadius:10,
                     backgroundColor: "#ff523b", color:"white",
                     cursor: "pointer"
                    }
                    }>
                    {loading ? "Processing..." : "Pay Now"}
                </button>

        </form>
    )
}

export default CheckOutForm;