 import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
 import { useState } from "react";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./styles/global.css";
import DataProvider from "./context/DataProvider.jsx";
import Shop from "./components/shop/Shop.jsx";
import Profile from "./components/profile/Profile.jsx";
import Viewproduct from "./components/product/Viewproduct.jsx"
import ForgetPassword from "./components/passwordReset/forgetPassword.jsx";
import ResetPassword from "./components/passwordReset/resetPassword.jsx"


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

        <Route path = '/forgetpassword' element={<ForgetPassword/>}/>

        <Route path = '/resetpassword/:userId' element={<ResetPassword/>}/>
  
        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/' element={<Home />}/>{/* This route is the main route */}
  
        </Route>

        <Route path='/shop' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/shop' element={<Shop />}/>{/* This route is the main route */}

        </Route>

        <Route path='/profile' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/profile' element={<Profile />}/>{/* This route is the main route */}

        </Route>

        <Route path='/product/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/product/:id' element={<Viewproduct />}/>{/* This route is the main route */}

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