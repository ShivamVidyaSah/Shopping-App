import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  email: String,
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  paymentIntentId: String,
  amount: Number,
  currency: String,
  shipping: {
    name: String,
    address: {
      line1: String,
      city: String,
      postal_code: String,
      country: String
    }
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      discount: Number,
      finalPrice: Number,
      quantity: Number
    }
  ]
}, { timestamps: true });

const order = mongoose.model("Order", orderSchema);

export default order;
