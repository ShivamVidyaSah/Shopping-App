import { useState } from "react"
import axios from "axios"
import { useActionData } from "react-router-dom"

const BillingDetailsForm = ({ payload , onPaymentReady}) => {

    const [form, setForm] = useState({
        name: "",
        line1: "",
        city: "",
        postal_code: "",
        country: "IN",
        currency: "usd",
    })

const [loading, setLoading] = useState(false);

console.log(payload);

const handleChange = (e) => {
    setForm({ ...form , [e.target.name]: e.target.value})
}

const handleSubmit = async(e) => {

    e.preventDefault();

    // Basic validation
    if (!form.name || !form.line1 || !form.city || !form.postal_code) {
        alert("Please fill in all fields.");
        return;
      }

    setLoading(true);
    try{

        const res = await axios.post("http://localhost:4000/create-payment-intent", {
            amount: payload.amount, // in the smallest currency unit (like cents or paisa)
            currency: form.currency,
            shipping: {
              name: form.name,
              address: {
                line1: form.line1,
                city: form.city,
                postal_code: form.postal_code,
                country: form.country,
              },
            },
            description: "Test Payment from React App",
          });
          
          const updatedPayload = {
            ...payload,
            shipping: {
              name: form.name,
              address: {
                line1: form.line1,
                city: form.city,
                postal_code: form.postal_code,
                country: form.country,
              },
            },
            currency: form.currency,
            description: "Test Payment from React App",
            clientSecret: res.data.clientSecret,
          };

          // Pass clientSecret up to parent
          console.log(updatedPayload);
          onPaymentReady(updatedPayload);

    }catch(error){
        console.error("Error creating payment intent:", error.message);
    }
    
    setLoading(false);

}


    return(
       <form onSubmit={handleSubmit}>
            <h2>Billing Details</h2>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
            <input type="text" name="line1" placeholder="Address Line 1" onChange={handleChange} />
            <input type="text" name="city" placeholder="City" onChange={handleChange} />
            <input type="text" name="postal_code" placeholder="Postal Code" onChange={handleChange} />
            <select name="country" onChange={handleChange}>
                <option value="IN">India</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                {/* add more if needed */}
            </select>

            <select name="currency" onChange={handleChange}>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
            </select>

            <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Proceed to Payment"}
            </button>
        </form>
    )
}


export default BillingDetailsForm;