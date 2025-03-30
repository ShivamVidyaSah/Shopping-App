import Product from "../model/product.js"



export const AddProduct = async(req,res) => {

    try{
            const newProduct = new Product(req.body);
            
            await newProduct.save();

            return res.status(200).json({msg:"Product added successfully"});
    }catch(error){
        return res.status(500).json({msg:"Add Product Failed"});
    }
}

export const getAllProducts = async(req,res) => {
    try{
            const products = await Product.find();

            return res.status(200).json(products);
    }catch(error){
            return res.status(500).json({msg: error.message})
    }
}