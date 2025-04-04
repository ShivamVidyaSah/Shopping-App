import Product from "../model/product.js"


export const AddProduct = async(req,res) => {

    try{
        const imageFiles = req.files.map(file => ({
            url: `/uploads/${file.filename}`,
            public_id: file.originalname
        }));

        //console.log(req);
        // const imageFiles = req.files.map(file => `/uploads/${file.filename}`);

        const newProduct = new Product({
            ...req.body,
            images: imageFiles
        });
            
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

export const deleteProduct = async(req,res) => {

    try{
        const deleted = await Product.deleteOne({_id: req.params.id});
        //in deleteOne param should be passed as an object

        return res.status(200).json({msg:"Product Deleted"})

    }catch(error){
        return res.status(500).json({error: error.message})
   
    }
}