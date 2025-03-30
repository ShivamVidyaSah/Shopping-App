import axios from "axios"
import { useEffect, useState } from "react"
import "../../../styles/profile/AllProducts.css"


const AllProducts = () => {

    const [products, setProduct] = useState([]); 
    // we are passing an array cuz we will map over the data

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


return (
    <div className="table-container">
        <h2>All Products</h2>

        <table>
        <thead>
            <tr> {/* table row */}
                <th>Images</th>  {/* table header */}
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
        {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img src={product.imageUrl} alt={product.name} className="product-img"/>
                                </td>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>₹{product.price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products found.</td>
                        </tr>
                    )}
        </table>
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