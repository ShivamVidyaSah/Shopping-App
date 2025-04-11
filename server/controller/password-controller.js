import User from "../model/user.js";
import generateOtp from "../utils/generateOtp.js";
import OTP from "../model/otp.js"
import nodemailer from "nodemailer";


//in this function we will also generate the otp 
export const sendOTP = async(req,res) => {

    try{

        const {email} = req.body;
        const isUser = await User.findOne({email});

        if(isUser){
        //return res.status(200).json({msg:"Email valid"});

        const existingOtp = await OTP.findOne({
            userId: isUser._id,
            expiresAt : {$gt: new Date()} //$gt - Mongoose symbol for greater than, checking for no expired otp
        })

        if(existingOtp){
            return res.status(400).json({ message: "An active OTP already exists. Try again after 5 mins." });

        }

        const code = generateOtp();
        const expiresAt = new Date(Date.now()+ 5*60*100); // expiry time 5 mins

        await OTP.create({userId: isUser._id, code, expiresAt});

        } else {
         return res.status(404).json({ msg: "This email is not registered" });
        }
    }catch(error){
        return res.status(500).json({msg: "Server Error"});
    }
}   