import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    discount: {
        type: Number,
        default: 0, // Example: 10 for 10% discount
    },
    finalPrice: {
        type: Number,
        default: function () {
            return this.price - (this.price * this.discount) / 100;
        }
    },
    images: [
        {
            url: String,
            public_id: String // If using Cloudinary
        }
    ],
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    brand: {
        type: String,
        default: "Generic"
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    sku: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ["In Stock", "Out of Stock", "Discontinued"],
        default: "In Stock"
    },
    tags: [String], // Example: ["electronics", "phone"]
    ratings: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, required: true },
            comment: { type: String }
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
