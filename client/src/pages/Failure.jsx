// src/pages/Failure.jsx
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>❌ Payment Failed</h1>
      <p>Something went wrong. Please try again.</p>
      <button onClick={handleBackToCart} style={{ marginTop: 20, padding: "10px 20px" }}>
        Back to Cart
      </button>
    </div>
  );
};

export default Failure;
