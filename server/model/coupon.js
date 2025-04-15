import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
    code:{
        type:String,
        required: true
    },
    discount:{
        type:String,
        required: true
    },
    useageNumber:{
        type:String,
        default: 200000
    },
    expiryDate:{
        type:Date
    }
})

const coupon = mongoose.model('coupon', couponSchema);

export default coupon;