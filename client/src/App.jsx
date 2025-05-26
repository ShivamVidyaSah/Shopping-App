 import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
 import { useState } from "react";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./styles/base.css";
import { ContextProvider } from "./context/ContextProvider.jsx";
import Shop from "./components/shop/Shop.jsx";
import Profile from "./components/profile/Profile.jsx";
import Viewproduct from "./components/product/Viewproduct.jsx"
import ForgetPassword from "./components/passwordReset/forgetPassword.jsx";
import ResetPassword from "./components/passwordReset/resetPassword.jsx"
import Cart from "./components/cart/Cart.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import Success from "./pages/Success.jsx";
import Failure from "./pages/Failure.jsx";
import OrderDetails from "./components/orders/ordersDetails.jsx";


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
    <ContextProvider>
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


        <Route path='/cart' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/cart' element={<Cart />}/>{/* This route is the main route */}

        </Route>

        <Route path='/checkout' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/checkout' element={<CheckoutPage />}/>

        </Route>

        <Route path='/success' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

          <Route path='/success' element={<Success />}/>

        </Route>

        <Route path='/failure' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

           <Route path='/failure' element={<Failure />}/>

        </Route>

        <Route path='/orders/:orderId' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >

           <Route path='/orders/:orderId' element={<OrderDetails />}/>

        </Route>

          {/* <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} /> */}
        
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </ContextProvider>
  
  );
}

export default App;