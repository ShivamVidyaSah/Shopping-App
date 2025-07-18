import logo from "../assets/logo.png"
import "../styles/navbar.css"
import profile from "../assets/profile-user.png"
import { Link } from "react-router-dom"
import cart  from "../assets/shopping-bag.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate();

    const role = sessionStorage.getItem("role");

    const movetoCart = () => {
        navigate('/cart');
    }

    return (
        <div id="header">
        <Link to="/"><img src={logo} className="logo" alt="Logo" /></Link>
        <div>
          <ul id="navbar">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            {/* <li><a href="blog.html">Blog</a></li> */}
            <li><Link to="about.html">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* <li><a href="/login">Logout</a></li> */}
            <li><Link to="/profile"><img src={profile}
            style={{width: 30, textDecoration: "none"}}/></Link></li>
            { 
            role === "Customer"?
            <li><img src={cart} onClick={(e) => movetoCart()}/></li>
            : 
            null}
          </ul>
        </div>
        <div id="mobile">
          <i id="bar" className="fas fa-bars"></i>
        </div>
      </div>
    )
}

export default Navbar;