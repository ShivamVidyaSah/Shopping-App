import { Link, useNavigate } from "react-router-dom";
import "../../styles/profile.css";
import profilePicture from "../../assets/profile-pic.png";
import axios from "axios";
import { useEffect, useState } from "react";
import AddProduct from "./admin/Addproduct.jsx";
import  AllProducts  from "./admin/AllProducts.jsx";
import AdminInbox from "../messaging/adminMessages/AdminInbox.jsx";
import AllCoupons from './admin/AllCoupon.jsx'
import Wishlist from "../wishlist/Wishlist.jsx"
import OrdersTab from "./customer/MyOrders.jsx";
import Queries from "../queries/queries.jsx";




const Profile = () => {
    const role = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("userName");
    const [ info, setInfo] = useState({});
    const [ showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        email: "",
        contact:""
    })
    const [error, setError] = useState(false);

    const [activeComponent, setActiveComponent] = useState("dashboard");

    const [profilePic, setProfilePic] = useState(null);

    const navigate = useNavigate();

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
    },[username]);

    const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async() => {
            try{
                const response = await axios.patch(`http://localhost:4000/updateuserinfo`,{
                    userId: info._id,
                    email: form.email,
                    contact: form.contact
                });

                if(response.status === 200){
                    alert("Profile updated successfully!");
                    setShowModal(false);
                    setError(false);
                    // Optionally, you can refresh the user info
                    const updatedInfo = await axios.get(`http://localhost:4000/getinfo?username=${username}`);
                    setInfo(updatedInfo.data);
                }


            }catch(error){
                setError(true);
            }
    }
    
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
                    <p id="user-email">Email: {info.email}</p>
                    <p id="user-role">Role: {info.role}</p>
                    <p id="user-contact">Contact: {info.contact}</p>
                </div>
                <button className="edit-profile" onClick={()=> setShowModal(true)}>✏️</button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Profile</h2>
                        {/* <input
                            name="username"
                            value={form.username}
                            onChange={handleFormChange}
                            placeholder="Username"
                            className={styles.inputField}
                        /> */}
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleFormChange}
                            placeholder="Email"
                            className="email-inputField"
                        />
                        <input
                            name="contact"
                            value={form.contact}
                            onChange={handleFormChange}
                            placeholder="Contact"
                            className="contact-inputField"
                        />
                        <div className="buttonGroup">
                            <button onClick={handleSave} className="saveButton">Save</button>
                            <button onClick={() => setShowModal(false)} className="cancelButton">Cancel</button>
                        </div>
                        {error && <p className="error-message">Error updating profile. Please try again.</p>}
                    </div>
                </div>
            )}


        <div className="profile-content">
            <div className="sidebar">
                <ul id="menu">
                    {role === "Admin"?
                    <>
                        <li onClick={() => setActiveComponent("addProduct")}>Add Products</li>
                        <li onClick={() => setActiveComponent("allProducts")}>All Products</li>
                        <li onClick={() => setActiveComponent("admin-messages")}>Messages</li>
                        <li onClick={() => setActiveComponent("queries")}>Queries</li>
                        <li onClick={() => setActiveComponent("coupon")}>Coupons</li>
                        <li><Link to="/login">Logout</Link></li>
                    </>
                    :
                    <>
                        <li onClick={() => setActiveComponent("myorders")}>My Orders</li>
                        <li onClick={() => setActiveComponent("wishlist")}>Wishlist</li>
                        <li onClick={() => setActiveComponent("user-messages")}>Messages</li>
                        <li onClick={() => navigate('/cart')}>Cart</li>
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
                        {activeComponent === "admin-messages" && <AdminInbox />}
                        {activeComponent === "user-messages" && <UserInbox/>}
                        {activeComponent === "coupon" && <AllCoupons/>}
                        {activeComponent === "myorders" && <OrdersTab />}
                        {activeComponent === "queries" && <Queries />}
                        {activeComponent === "wishlist" && <Wishlist />}
                        {/* {activeComponent === "chat" && navigate('/cart') } */}
                    </div>
                )
            }
            
        </div>
    </div>
    )
}

export default Profile;