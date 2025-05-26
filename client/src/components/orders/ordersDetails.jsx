import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/profile/OrdersDetails.module.css"; // 👈 Importing the CSS module

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/orders/${orderId}`);
        console.log(response.data);
        setOrder(response.data.getorder);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className={styles.container}>
      {/* Product List Section */}
      <div className={styles.productList}>
        {order.items.map(item => (

          <div key={item.productId} className={styles.productCard}>
            <img src={item.image} alt={item.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.finalPrice}</p>
              <p>Total: ${(item.quantity * item.finalPrice )}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Section */}
     <div className={styles.summarySection}>
      {/* Shipping Details */}
      <div className={styles.shipping}>
        <h4>Shipping Details</h4>
        <p><strong>Name:</strong> {order.shipping.name}</p>
        <p><strong>Phone:</strong> {order.shipping.phone}</p>
        <p><strong>Email:</strong> {order.shipping.email}</p>
        <p><strong>Address:</strong> {order.shipping.address.line1}, {order.shipping.address.city}, {order.shipping.address.postal_code}, {order.shipping.address.country}</p>
        <p><strong>Postal Code:</strong> {order.shipping.address.postal_code}</p>
        <p><strong>Country:</strong> {order.shipping.address.country}</p>
      </div>

      {/* Payment Summary */}
      <div className={styles.payment}>
        <h4>Payment Summary</h4>
        <p><strong>Amount Paid:</strong> ${order.amount }</p>
        <p><strong>Coupon Applied:</strong> {order.coupon?.code || "None"}</p>
        <p><strong>Discount:</strong> {order.coupon ? `${order.coupon.discount}%` : "0%"}</p>
        {/* <p><strong>Payment Method:</strong> {order.payment.method}</p> */}
        <p><strong>Payment Status:</strong> {order.status}</p>
        <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
    </div>

      {/* Download Invoice */}
      <button className={styles.invoiceBtn}>Download Invoice</button>
    </div>
  );
};

export default OrderDetails;
