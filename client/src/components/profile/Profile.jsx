import { Link } from "react-router-dom";
import "../../styles/profile.css";
import profilePicture from "../../assets/profile-pic.png";
import axios from "axios";
import { useEffect, useState } from "react";
import AddProduct from "./admin/Addproduct.jsx";
import  AllProducts  from "./admin/AllProducts.jsx";
import Addcoupon from "./admin/Addcoupon.jsx";




const Profile = () => {
    const role = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("userName");
    const [ info, setInfo] = useState({});

    const [activeComponent, setActiveComponent] = useState("dashboard");

    const [profilePic, setProfilePic] = useState(null);

    const handleChange = (e) => {

        const file = e.target.files[0];
        if(file){
            setProfilePic(file);
            updateProfilePic(file);
        }

    }

    const updateProfilePic = async(file) => {

        const formData = new FormData();
        formData.append("profileimage",file);
        formData.append("userId", info._id);
                try{
                    const response = await axios.patch('http://localhost:4000/updateinfo', formData, {
                        headers: {'Content-Type': "multipart/form-data"}
                    })

                    if(response.status === 200){
                        alert("Profile updated successfully!");
                    }
                }catch(error){
                    console.error("Error updating profile:", error);
                }
    }

    useEffect (() => {

        const getInfo = async() => {
            try{

                const response = await axios.get(`http://localhost:4000/getinfo?username=${username}`);
                //in axios.get GET requests don’t send data as the second parameter. 
                //You should pass the username as a query parameter (?username=value) or in the headers. 

                if(response.status != "200"){
                    console.log("Invalid User");
                }

                setInfo(response.data);
                console.log(response.data.images.url);
               // console.log("This is user info: ", info.username);
                

            }catch(error){
                console.log(error);
            }

        }

        getInfo();
    },[username])
    
    const url =  profilePicture;

    return (
        <div className="profile-container">
        <div className="profile-header">
            <div className="profile-pic-container">
                
                    <img src= {info.images?.url ? `http://localhost:4000${info.images.url}` : url} alt="User Profile" className="profile-pic"/>
            
                <input type="file" id="change-pic" style={{display:"none"}} onChange={handleChange} accept="images/*"/>
                <label className="change-pic-label" htmlFor="change-pic" style={{cursor:"pointer"}}>✏️</label>
            </div>
            <div className="profile-info">
                <h2 id="user-name">{info.username}</h2>
                <p id="user-email">{info.email}</p>
                <p id="user-role">Role: {info.role}</p>
                <p id="user-contact">Contact: {info.contact}</p>
            </div>
            <button className="edit-profile">✏️</button>
        </div>

        <div className="profile-content">
            <div className="sidebar">
                <ul id="menu">
                    {role === "Admin"?
                    <>
                        <li onClick={() => setActiveComponent("addProduct")}>Add Products</li>
                        <li onClick={() => setActiveComponent("allProducts")}>All Products</li>
                        <li onClick={() => setActiveComponent("messages")}>Messages</li>
                        <li onClick={() => setActiveComponent("coupon")}>Coupon</li>
                        <li><Link to="/login">Logout</Link></li>
                    </>
                    :
                    <>
                        <li onClick={() => setActiveComponent("myorders")}>My Orders</li>
                        <li onClick={() => setActiveComponent("wishlist")}>Wishlist</li>
                        <li onClick={() => setActiveComponent("cart")}>Cart</li>
                        <li><Link to='/login'>Logout</Link></li>
                    </>
                    }
                </ul>
            </div>

            {activeComponent === "dashboard"? (
                <div className="main-content" id="main-content">

                    <h2>Welcome to Your Dashboard</h2>
                    <p>Select an option from the left menu.</p>
                </div>    
                    ) : (
                    <div className="main-content">
                        {activeComponent === "addProduct" && <AddProduct />}
                        {activeComponent === "allProducts" && <AllProducts />}
                        {activeComponent === "messages" && <Messages />}
                        {activeComponent === "coupon" && <Addcoupon/>}
                        {activeComponent === "orders" && <Orders />}
                        {activeComponent === "wishlist" && <Wishlist />}
                        {activeComponent === "chat" && <Chat />}
                    </div>
                )
            }
            
        </div>
    </div>
    )
}

export default Profile;