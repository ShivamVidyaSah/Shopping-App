import Token from "../model/token.js"

import dotenv from "dotenv";
dotenv.config();

//importing the varaible storing the scheme
import User from "../model/user.js";


import jwt from "jsonwebtoken";
// we will be using this for authentication


import bcrypt from "bcrypt";


export const signUpUser = async(req,res) => {

        try{

            const salt = await bcrypt.genSalt();// generating salt

            const hashedPassword = await bcrypt.hash(req.body.password, salt);// generating hashed password

            const user = { username: req.body.username, name : req.body.name, email:req.body.email, role:req.body.role ,password: hashedPassword};

            const newUser = new User(user);

            await newUser.save();

            return res.status(200).json({msg:"SignUp successful"});


        }catch(error){
            return res.status(500).json({msg:"Error during SignUp"});
        }
}


export const userLogin = async(req,res) => {

        try{
            //  console.log(req);
            let user = await User.findOne({
                $or:[
                    {username:req.body.usernameEmail},
                    {email:req.body.usernameEmail}
                ]
            });

                        


            if(!user){
                return res.status(400).json({msg:"Invalid username or email"});
            }

            //console.log("User found ", user);

            let match = await bcrypt.compare(req.body.password, user.password);

            //console.log(match);

            if (!match) {
                return res.status(400).json({ msg: "Invalid password" });
            }

            if(match){
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '55m'} );
        
                const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

                const newToken = new Token({token: refreshToken});
                await newToken.save();

                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username, role: user.role, userId: user._id});
            }

        }catch(error){
            return res.status(500).json({msg:"Error while logging in the user"});
        }
}


export const getUserInfo = async(req,res) => {

    try{
            const info = await User.findOne({username: req.query.username});
            
            res.status(200).json(info);
    }catch(error){
            res.status(500).json({error: error.message});
    }
}

export const updateImg = async(req,res) => {

    try{
      
        const imageFile = {
            url: `/uploads/${req.file.filename}`,
            public_id: req.file.originalname,
          };

        const update = await User.findByIdAndUpdate(
            req.body.userId, 
            {images: imageFile},
            {new:true}
        )

        if (!update) {
            return res.status(404).json({ msg: "User not found" });
          }
      
          res.status(200).json({ msg: "Profile updated", user: update});
    }catch(error){
        console.error("Error updating profile:", error);
        res.status(500).json({ msg: "Server error" });
    }
}

export const updateUserInfo = async(req,res)=> {

    try{
        const {userId, email,contact} = req.body;

        // Build the update object dynamically
        const updateFields = {};
        if (email) updateFields.email = email;
        if (contact) updateFields.contact = contact;

        // Check if there's anything to update
        if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ msg: "No valid fields provided to update" });
        }

        const update = await User.findByIdAndUpdate(
            userId,
            updateFields,
            {new: true}
        )

        return res.status(200).json({msg: "User Info Updated", update});

    }catch(error){
        console.error("Error updating user info:", error);
        return res.status(500).json({msg: "Server error while updating user info"});
    }
}

