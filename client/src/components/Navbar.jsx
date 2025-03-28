import logo from "../assets/logo.png"
import "../styles/navbar.css"


const Navbar = () => {
    return (
        <div id="header">
        <a href="#"><img src={logo} className="logo" alt="Logo" /></a>
        <div>
          <ul id="navbar">
            <li><a href="/" className="active">Home</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="/login">Logout</a></li>
            <li><a href="cart.html"><i className="fas fa-shopping-cart cart"></i></a></li>
          </ul>
        </div>
        <div id="mobile">
          <i id="bar" className="fas fa-bars"></i>
        </div>
      </div>
    )
}

export default Navbar;