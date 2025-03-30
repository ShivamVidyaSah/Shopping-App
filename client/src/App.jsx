 import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
 import { useState } from "react";
import Home from "./components/Home.jsx";
// import About from "./components/About";
// import Blog from "./components/Blog";
// import Cart from "./components/Cart";
// import Contact from "./components/Contact";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import "./styles/global.css";
import DataProvider from "./context/DataProvider.jsx";
import Shop from "./components/shop/Shop.jsx";
import Profile from "./components/profile/Profile.jsx";


 const PrivateRoute = ({isAuthenticated, ...prop}) => {

       return isAuthenticated ? ( 
        <>
          <Navbar/>

          <Outlet/>
        </>):(
         <Navigate replace to='/login'/>
        );
 }

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(true);

  return (
    <DataProvider>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>

        <Route path ='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />

          
        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/' element={<Home />}/>{/* This route is the main route */}
  
        </Route>

        <Route path='/shop' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/shop' element={<Shop />}/>{/* This route is the main route */}

        </Route>

        <Route path='/profile' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/profile' element={<Profile />}/>{/* This route is the main route */}

        </Route>
          {/* <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} /> */}
        
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </DataProvider>
  
  );
}

export default App;