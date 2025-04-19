import Coupon from "../model/coupon.js"


export const CreateCoupon = async(req,res) => {

    try{

        //checking whether a coupon of same code exist
        const couponExist = await Coupon.find({code: req.body.code});
        
        if(couponExist.length > 0){
           
            return res.status(409).json({msg:"Coupon exist"});
        }else{

            const newCoupon = new Coupon(req.body);
            await newCoupon.save();
            return res.status(200).json({msg:"Coupon created"})
        }

    }catch(error){
        return res.status(500).json({msg:"Server Error"});
    }
}