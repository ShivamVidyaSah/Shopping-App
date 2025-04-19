import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code:{
        type:String,
        required: true
    },
    discount:{
        type:Number,
        required: true
    },
    usageNumber:{
        type:Number,
        default: 200000
    },
    expiryDate:{
        type:Date
    }
})

const coupon = mongoose.model('coupon', couponSchema);

export default coupon;