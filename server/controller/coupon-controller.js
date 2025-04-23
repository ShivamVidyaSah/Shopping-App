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

export const verifyCoupon = async(req,res) => {

    try{
        // console.log(req.query.couponcode)/\;
        const isCoupon = await Coupon.findOne({code: req.query.couponcode});

        // {
        //     _id: new ObjectId('6806774926e7e940e143e9f2'),
        //     code: 'happy1',
        //     discount: 10,
        //     usageNumber: 3,
        //     expiryDate: 2025-04-25T00:00:00.000Z,
        //     __v: 0
        //   }

        if (!isCoupon) {
            return res.status(404).json({ msg: "Coupon not found" });
          }

        if(isCoupon.usageNumber === 0){
            return res.status(400).json({msg:"Invalid Coupon"});
        }
            await Coupon.updateOne(
                { _id : isCoupon._id},
                {$set: {usageNumber: isCoupon.usageNumber-1}}
            ); // later remove this to when the order is complete or else this will remain as a bug
            return res.status(200).json({ discount: isCoupon.discount });
        

    }catch(error){
        console.error(error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
}