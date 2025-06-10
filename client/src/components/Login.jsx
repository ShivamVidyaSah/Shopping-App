import React, { useContext, useState } from "react";
import "../styles/login.css";
import logo2 from "../../public/img-assets/logo2.png"
import axios from "axios";

//import { DataContext } from "../context/DataProvider.jsx";
import {useNavigate} from "react-router-dom";



const signUpInitialValues = {
      name:'',
      username:'',
      email:'',
      role:'Customer',
      password:'',
      phone:''
};

const loginInitialValues = {
  usernameEmail:'',
  password:''
}

const LoginPage = ({isUserAuthenticated}) => {
  const [isRegister, setIsRegister] = useState(false);
  const log = " Login";
  const reg = " Register";

  const [login, setLogin] = useState(loginInitialValues);

  const [signUp, setSignUp] = useState(signUpInitialValues);

  // const {setAccount} = useContext(DataContext);
  //const {setAccount} = useContext(DataContext);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
       
        setLogin({...login, [e.target.name]: e.target.value});
  }

  const onValueChange = (e) => {
    setSignUp({...signUp, [e.target.name]:e.target.value});
  }


  const signUpUser = async(e) => {
    e.preventDefault();
    try{

        const response = await axios.post('http://localhost:4000/signup', 
          signUp,
          { headers: { "Content-Type": "application/json" }});
        // console.log("Signup successful:", response.data);
        setIsRegister(false);


    }catch(error){
      console.error("Signup failed:", error.response?.data || error.message);
      setError(`Signup failed:${ error.response?.data || error.message}`)
    }
  }
  


  const loginUser = async(e) => {
    e.preventDefault();
    try{
      setError("");
        const response = await axios.post('http://localhost:4000/login', login,
          { headers: { "Content-Type": "application/json" }}
        );
        // console.log(response);
        if( response.status===200){
          setError("");
          sessionStorage.setItem('accessToken' , `Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken' , `Bearer ${response.data.refreshToken}`);
          sessionStorage.setItem('userName',`${response.data.username}`);
          sessionStorage.setItem('role',`${response.data.role}`);
          sessionStorage.setItem('userId',`${response.data.userId}`);

          //setAccount({username: response.data.username, name: response.data.name});
         
          isUserAuthenticated(true);
      
          navigate('/');
         
        }

        if(response.status === 400){
          setError("Invalid Username or Email")
        }
    }catch(error){
        console.log(error);
        setError("Login failed: Invalid credentials or server error");
    }
  }

  const forgetPassword = () => {
      navigate('/forgetpassword');
  }


  return (
    
    
        <div className="container">
            <div className="row" >
                <div className="col-2">
                    <img src={logo2} alt=""/> 
                </div>

                <div className="col-2">
                    <div className="form-container">
                            <div className="form-btn">
                                <span >
                                  {
                                  (isRegister)? reg: log
                                  }
                                  </span>
                                {/* <span onClick={() => setIsRegister(true)}>Register</span> */}
                                <hr
                                  id="Indicator"
                                />
                            </div>

                            {!isRegister? 

                            (<form id="LoginForm" onSubmit={loginUser}>
                                <input type="text" name="usernameEmail" placeholder="Username/Email" onChange={(e)=>handleLoginChange(e)}/>
                                <input type="password" name="password" placeholder="Password" onChange={(e)=>handleLoginChange(e)}/>
                                <button type="submit" className="btn" >Login</button>
                               { error && <p className="error">{error}</p>}
                                <a id='forget-password' onClick={()=> forgetPassword()}>Forget Password</a>
                                <p>Don't have an account?<a id='sign' onClick={()=> {setError("");setIsRegister(true)}}>{reg}</a></p>
                            </form>)
                              :
                           ( <form id="RegForm" onSubmit={signUpUser}>
                                <input type="text" name="name" placeholder="Full Name" onChange={(e)=>onValueChange(e)}/>
                                <input type="text" name="username" placeholder="Username" onChange={(e)=>onValueChange(e)}/>
                                <input type="email" name="email" placeholder="Email" onChange={(e)=>onValueChange(e)}/>
                                <input type="password" name="password" placeholder="Password" onChange={(e)=>onValueChange(e)}/>
                                <button type="submit" className="btn" >Sign Up</button>
                                { error && <p className="error">{error}</p>}
                                <p>Already have an account? <a id='log' onClick={()=> {setError("");setIsRegister(false)} }>{log}</a> </p>
                            </form>)
                          }
                    </div>
                </div>
            </div>
        </div>

  );
};

export default LoginPage;