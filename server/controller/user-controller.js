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

                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username, role: user.role});
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