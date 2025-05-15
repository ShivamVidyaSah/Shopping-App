import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/profile/OrdersTab.module.css";



const OrdersTab = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();


    useEffect(()=>{

        const fetchOrders = async() => {
            try{
                const response = await axios.get(`http://localhost:4000/orders/${userId}`);
                if(response.status === 200){
                setOrders(response.data.allOrders);
                }

                console.log(orders);

            }catch(error){
                console.error("Failed to fetch orders", error);
            }finally{
                setLoading(false);
            }
        }

        if(userId) fetchOrders();

    },[userId])

    const handleViewDetails = (orderId) => {
        navigate(`/orders/${orderId}`);
    }



    if(loading) return <p>Loading Orders...</p>;
    if(orders.length === 0) return <p>No Orders Found</p>; 

    return(
        <div className={styles.ordersContainers}>
            {orders.map((order)=>(
                <div key={order._id} className={styles.orderCard}>
                    <h3>Order #{order._id.slice(-6)}</h3>
                    <p>Amount: {(order.amount ).toFixed(2)} {order.currency.toUpperCase()}</p>
                    <p>Status: <strong>{order.status}</strong></p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <button onClick={() => handleViewDetails(order._id)}>See Details</button>
                </div>
            ))}

        </div>
    )
}

export default OrdersTab;