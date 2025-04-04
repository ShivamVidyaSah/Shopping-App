import React, { useState } from "react";
import "../../../styles/profile/AddProduct.css";
import axios from "axios";

const productInitialValues = {
  name: "",
  description: "",
  price: "",
  discount: "",
  category: "",
  brand: "",
  stock: "",
  sku: "",
  tags: "",
  images: [],
}

const AddProduct = () => {
  const [product, setProduct] = useState(productInitialValues);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, images: [...e.target.files] });
  };

  const formData = new FormData();

  Object.keys(product).forEach((key)=> {
    if(key != 'images'){
      formData.append(key, product[key]);
    }
  })

  product.images.forEach((image) => {
    formData.append("images", image); 
});

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{

    const response = await axios.post('http://localhost:4000/addproduct', formData , {
      header : {"Content-Type": "multipart/form-data"}
    });

    if(response.status=== 200){
        console.log("Product added successfully");
       // setProduct(productInitialValues);
    }

    }catch(error){
      console.error("Error uploading product:", error);
    }
    console.log("Product Data:", product);
  };

  return (
    <div className="add-product-container">
      <h2 id="heading">Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input type="number" name="discount" value={product.discount} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input type="text" name="brand" value={product.brand} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>SKU (Stock Keeping Unit)</label>
          <input type="text" name="sku" value={product.sku} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input type="text" name="tags" value={product.tags} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Upload Images</label>
          <input type="file" name="images" multiple onChange={handleFileChange} />
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
