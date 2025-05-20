import Order from "../model/order.js";

export const getAllOrders = async(req,res) => {

    try{

        const allOrders = await Order.find({ userId : req.params.id}).sort({createdAt: -1}); // sorting in descending order
        if(allOrders.length > 0){
            return res.status(200).json({allOrders});
        }else{
            return res.status(400).json({msg: "No orders found"})
        }

    }catch(error){
        return res.status(500).json({msg: "Error while getting orders"});
    }

}

export const getSingleOrder = async(req,res) => {

    try{
        console.log(req);
        const getorder = Order.findById({orderId : req})

    }catch(error){

    }
}