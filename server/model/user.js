
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
    phone:{
        type:String
    }
})


const user = mongoose.model('user', userSchema);


export default user;