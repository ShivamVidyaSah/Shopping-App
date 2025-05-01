import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const CreatePaymentIntent = async(req,res) => {

    try{

        const {amount} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency : "usd",
            payment_method_types: ["card"]
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
          });

    }catch(error){
        console.error("Stripe error:", error.message);
        res.status(500).json({ error: error.message });
    }
}