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

export const getAllCoupons = async(req,res) => {

    try{
            const getCoupons = await Coupon.find();

            if(getCoupons.length>0){
                return res.status(200).json(getCoupons);
            }else{
                return res.status(404).json({msg: "No coupons to display"});
            }
    }catch(error){
            return res.status(500).json({msg: "Server error"});
    }
}

export const deleteCoupon = async(req,res) => {

    try{
        const couponDeleted = await Coupon.deleteOne({_id: req.params.id});

        return res.status(200).json({msg: "Coupon deleted"});
    }catch(error){
        return res.status(500).json({msg:"Server error"});
    }
}