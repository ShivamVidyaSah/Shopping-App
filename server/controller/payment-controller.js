import Stripe from "stripe";
import Order from "../model/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const CreatePaymentIntent = async(req,res) => {
    // this function will have 2 operations
    // 1. create a payment intent
    // 2. save the order in the database and return the orderid for future use

    try{

        const { amount, currency, shipping, description } = req.body;
        const {name, address} = shipping;

       // console.log(req.body);

          if (!amount || !currency || !shipping.name || !shipping.address) {
            return res.status(400).json({ error: "Missing required fields" });
            }

            //create payment intent
            const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
            payment_method_types: ["card"],
            shipping: {
                name,
                address,
            },
            
            });


            //save details to database
            const newOrder = new Order({
                amount,
                currency,
                shipping,
                userId: req.body.userId,
                items: req.body.cartItems,
                paymentIntentId: paymentIntent.id,
                status: "pending", // default but we set it explicitly
              });
          
              const savedOrder = await newOrder.save();

            res.send({
            clientSecret: paymentIntent.client_secret,
            orderId: savedOrder._id, // optional, in case you want it
            paymentIntentId: paymentIntent.id,
            });

    }catch(error){
        console.error("Stripe error:", error.message);
        res.status(500).json({ error: error.message });
    }
}

export const confirmPayment = async(req,res) => {
    
    const {orderId, paymentIntentId} = req.body;

    if(!orderId || !paymentIntentId){
        return res.status(400).json({ error: "Missing orderId or paymentIntentId" });
    }

    try{
        // 1. retrieve the payment details
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if(paymentIntent.status !== "succeeded" ){
            return res.status(400).json({ error: "Payment not successfull" });
        }

        // 2. update the order status in database
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                status: "processing", // now that payment is done
            },
            {new : true}
        )

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
          }
      
          res.json({ message: "Payment confirmed", order: updatedOrder });


    }catch(error){
        console.error("Error confirming payment:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}