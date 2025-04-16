import Coupon from "../model/coupon.js"


export const CreateCoupon = async(req,res) => {

    try{

        //checking whether a coupon of same code exist
        const couponExist = Coupon.findOne(req.body.code);
        if(couponExist){
            console.log("Coupon Exist");
            return res.status(401).json({msg:"Coupon exist"});
        }else{
            return res.status(200).json({msg:"Coupon created"})
        }

    }catch(error){
        return res.status(4500).json({msg:"Server Error"});
    }
}