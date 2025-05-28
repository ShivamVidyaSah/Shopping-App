
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    role: {
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String
    },
    images: 
        {
            url: {type: String, default: ""},
            public_id: {type: String, default: ""} // If using Cloudinary
        }
})


const user = mongoose.model('user', userSchema);


export default user;