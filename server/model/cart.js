const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    _id: false, // prevent Mongo from auto-generating _id for subdocuments
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    image: { type: String },
    discount: { type: Number, default: 0 },
}, { _id: false });

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Each user should have only one cart
    },
    items: [CartItemSchema],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cart', CartSchema);
