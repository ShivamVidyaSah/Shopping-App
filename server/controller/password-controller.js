import User from "../model/user.js";
import generateOtp from "../utils/generateOtp.js";
import OTP from "../model/otp.js"
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config();


//in this function we will generate and send the otp via mail
export const sendOTP = async(req,res) => {

    try{

        const {email} = req.body;
        const isUser = await User.findOne({email});

        if(isUser){
        //return res.status(200).json({msg:"Email valid"});

        const existingOtp = await OTP.findOne({
            userId: isUser._id,
            expiresAt : {$gt: new Date()} 
            //$gt - Mongoose symbol for greater than, checking for no expired otp
        })

        if(existingOtp){
            return res.status(400).json({ message: "An active OTP already exists. Try again after 5 mins." });

        }

        const code = generateOtp();
        const expiresAt = new Date(Date.now()+ 5*60*1000); // expiry time 5 mins

        await OTP.create({userId: isUser._id, code, expiresAt}); // saving the OTP to database

        //the nodemailer code
        const transporter = nodemailer.createTransport({
            service :"gmail",
            auth : {
                user: "sahahivam10@gmail.com",
                pass: process.env.EMAIL_PASSWORD
            }
        })

        await transporter.sendMail({
            from : "sahahivam10@gmail.com",
            to : email,
            subject : "OTP Code for Verification. Closet Collection",
            text : `Your OTP is : ${code}. It will expire in 5 mins`
        })

        return res.status(200).json({ success: true, message: "OTP sent to your email.", userId: isUser._id });

        } else {
         return res.status(404).json({ msg: "This email is not registered" });
        }
    }catch(error){
        return res.status(500).json({msg: "Server Error"});
    }
}   

// function to verify the otp

export const verifyOTP = async(req,res) => {

    const { userId, otp} = req.body;

    try{
             
        const otpEntry = await OTP.findOne({
            userId: userId,
            code: otp,
            expiresAt: {$gt: new Date()}
        })

        if (!otpEntry) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
          }

          await OTP.deleteMany({ userId: userId });
          // deleting the otp after verfication

          return res.status(200).json({ success: true, message: "OTP verified." })
    }catch(error){
        console.error(error);
        return res.status(500).json({ success: false, message: "OTP verification failed." });
    }
}

export const resetPassword = async(req,res) => {

    try{
        // console.log(req);
        const { userId, password } = req.body;

       const user = await User.findById(userId);
       //finding the user with userId

       console.log(user);

       const salt = await bcrypt.genSalt();
       const hashedPassword = await bcrypt.hash(password,salt);
       //hashing the new password

       user.password = hashedPassword;

       await user.save();

       return res.status(200).json({ success: true, message: "Password updated successfully" });

    }catch(error){

        console.error("Error resetting password:", error);
        return res.status(500).json({ success: false, message: "Server error" });

    }
}