import axios from "axios"
import { useEffect, useState } from "react"
import "../../../styles/profile/AllProducts.css"


const AllProducts = () => {

    const [products, setProduct] = useState([]); 
    // we are passing an array cuz we will map over the data

    const [ showWarning, setShowWarning] = useState(false);
    const [selectedProductID, setSelectedProductId] = useState(null);
    const [ deleted, setDeleted] = useState(false);

    useEffect(()=>{

        const getProducts = async() => {
        try{
            const response = await axios.get('http://localhost:4000/getallproducts')

            if(response.status === 200){
                setProduct(response.data);
            }

        }catch(error){
            return "No post found";
        }
    }

    getProducts();

},[])

const confirmDelete = (id) => {
    setSelectedProductId(id);
    setShowWarning(true);

}


const handleDelete = async() => {

    try{
    const response = await axios.delete(`http://localhost:4000/deleteproduct/${selectedProductID}`);
    setProduct(products.filter((product)=> product._id !== selectedProductID));
    setShowWarning(false);
    setDeleted(true);

    }catch(error){

    }
}


return (
    <div className="table-container">
        <h2 style={{color:"#ff523b"}}>All Products</h2>

        <table>
        <thead>
            <tr> {/* table row */}
                <th>Images</th>  {/* table header */}
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
        {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img src={product.images?.[0]?.url} alt={product.name} className="product-img"/>
                                </td>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>₹{product.finalPrice}</td>
                                <td>
                                    <button className="edit-btn" onClick={()=>handleEdit(product._id)}>✏️</button>
                                    <button className="delete-btn" onClick={()=> confirmDelete(product._id)}>🗑️</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products found.</td>
                        </tr>
                    )}
        </table>

        {/* Product delete confirmation */}
        {showWarning && (
        <div className="popup">
            <div className="popup-content">
                    <p>Are you sure you want to delete?</p>
                    <button className="yes-btn" onClick={handleDelete}>Yes</button>
                    <button className="no-btn" onClick={()=>setShowWarning(false)}>No</button>
            </div>
        </div>
        )}
        {deleted && (
        <div className="deleted">
            <div className="deleted-content">
                    <p>Product Deleted.</p>
                    <button className="ok-btn" onClick={()=>setDeleted(false)}>OK</button>
            </div>
        </div>
        )}
        {/* <ul>
            {product.length > 0 ? (
                product.map((item) => (
                    <li key={item._id}>{item.name} - ₹{item.price}</li>
                ))
            ) : (
                <p>No products found.</p>
            )}
        </ul> */}
    </div>
);
}

export default AllProducts;