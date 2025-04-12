import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/passwordReset/resetPassword.css"
import eye from "../../assets/eye.png";
import eyehide from "../../assets/eyehide.png";
import check from "../../assets/check.png"
import remove from "../../assets/remove.png";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const {userId} = useParams();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
   // API call to reset password goes here
    try{

        const response = await axios.put('http://localhost:4000/resetuserpassword', {
          userId: userId,
          password: confirmPassword
        });

        if(response.data.success){
          setPasswordUpdate("Password Updated Successfully.");
        }else{
          setPasswordUpdate("Error while updating password.")
        }


    }catch(error){
        console.log(error);
    }

  };

  useEffect(()=>{
    //for shwoing that confirm password is same as input password
    if(confirmPassword.length>0){
      if (newPassword !== confirmPassword) {
        setStatusMessage("Passwords do not match.");
        return;
      }else{
        setStatusMessage("Password Matched")
      }
    }else{
      setStatusMessage("")
    }
},[newPassword, confirmPassword])

  const tooglePassword = () => {

    if(!showPassword){
      setShowPassword(true);
      setPasswordType("text");
    }else{
      setShowPassword(false);
      setPasswordType("password");
    }

  }

  return (
    <div className="reset-container">
      <form onSubmit={handleSubmit} className="reset-form">
        <h2 className="reset-title">Reset Your Password</h2>

      <div className="input-area">
        <input
          type={passwordType}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="reset-input"
          required
        />
        {showPassword === true ?
        <span><img className="toogle-eye" src={eyehide} onClick={tooglePassword}/></span>
        : 
        <span><img className="toogle-eye" src={eye} onClick={tooglePassword}/></span>
        }
      </div>  


      <div className="confirm-password-area">
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="reset-input"
          required
        />
        {statusMessage === "Password Matched" ?
        <span><img className="toogle-confirm" src={check}/></span>
        :
        <span><img className="toogle-confirm" src={remove}/></span>
        }
        </div>

        {passwordUpdate && (
          <p className="reset-error">{passwordUpdate}<span className="redirect" onClick={() => navigate('/login')}> Go to Login</span></p>
        )}

        <button type="submit" className="reset-btn">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
