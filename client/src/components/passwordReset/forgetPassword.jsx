import { useState } from "react";
import axios from "axios";
import "../../styles/passwordReset/forgetPassword.css"
// import dotenv from "dotenv";
// dotenv.config();


const forgetPassword = () => {

    const [email, setEmail] = useState("");
    const [ otp, setOTP] = useState("");
    const [displayOTP, setDisplayOTP] = useState(false);
    const [ statusMessage, setStatusMessage] = useState("");
    const [userId, setUserId] = useState("");
 
    const handleSubmit = async(e) => {
      e.preventDefault();
      setStatusMessage(" ");

      if(!displayOTP) {
        // send email with otp
        try{
         const response = await axios.post('http://localhost:4000/forgetpassword', {email});
         setStatusMessage('OTP sent to your email.');
         setDisplayOTP(true);
        //  userId = response.data.userID;
        setUserId(response.data.userId);
         console.log(response);

        }catch(error){
            // setStatusMessage('Failed to send OTP. Please try again.');
            setStatusMessage(error.response.data.msg);
            // console.log(error.response.data);
        }
      }
        else
        {
          //send the otp for verification
        try{
          const response = await axios.post('http://localhost:4000/verify-otp', { userId , otp });
          if (response.data.success) {
          navigate("/reset-password", { state: { email } });
      } else {
           setStatusMessage("Invalid OTP. Please try again.");
          }
        }catch(error){
          setStatusMessage("Error verifying OTP. Try again.");
        }

      }

    }

    return(
    
            <div className="forget-password-wrapper">
              <div className="forget-password-box">
                <h2 className="title">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email" className="label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  { displayOTP && 
                  <>
                    <label htmlFor="email" className="label">Enter OTP</label>
                    <input
                      type="OTP"
                      id="OTP"
                      className="input"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      placeholder="Enter the OTP"
                      required
                    />
                  </>
                  }
                  {displayOTP ? 
                  <button type="submit" className="OTP-button">Enter OTP</button>
                  :
                  <button type="submit" className="submit-button">Verify & Send OTP </button>
                  }
                </form>
                {statusMessage && <p className="status-message">{statusMessage}</p>}
              </div>
            </div>
          );
        };
        
export default forgetPassword;