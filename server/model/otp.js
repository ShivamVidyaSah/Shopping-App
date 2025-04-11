import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    code: {
    type: String,
    required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const otp = mongoose.model("OTP", otpSchema);

export default otp;