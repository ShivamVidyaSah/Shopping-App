import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const CreatePaymentIntent = async(req,res) => {

    try{

        const { amount, currency, shipping } = req.body;
        const {name, address} = shipping;

          if (!amount || !currency || !shipping.name || !shipping.address) {
            return res.status(400).json({ error: "Missing required fields" });
            }

            const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"],
            description: "E-commerce export payment",
            shipping: {
                name,
                address,
            },
            });

            res.send({
            clientSecret: paymentIntent.client_secret,
            });

    }catch(error){
        console.error("Stripe error:", error.message);
        res.status(500).json({ error: error.message });
    }
}