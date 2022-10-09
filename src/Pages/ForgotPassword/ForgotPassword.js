import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import Logo from "Assets/Logo.png";
import "./ForgotPassword.css";
import "react-toastify/dist/ReactToastify.css";


toast.configure();


function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpKey, setotpkey] = useState("");

  let navigate = useNavigate();


  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const otpHandler = (e) => {
    setOTP(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const changePasswordHandler = () => {
    let decryptedotp = CryptoJS.AES.decrypt(otpKey, phoneNumber).toString(CryptoJS.enc.Utf8);
    if(decryptedotp === otp){

      let userid = localStorage.getItem('userid');

      axios
      .post(`${process.env.REACT_APP_SERVER}/authentication/forgotpassword`, {
        userid:userid,
        password: password,
      })
      .then((res) => {

        if (res.data.statusCode === 200) {
          toast.success("Password Changed Successfully", { autoClose: 1000 });
          navigate("/login"); 
        } else {
          toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });

      });
    }
    else{
      toast.warning("Invalid OTP!", { autoClose: 1000 });
    }

  };

 

  const sendOTP = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/authentication/sendOTP`, {
        phonenumber: phoneNumber,
      })
      .then((res) => {

        if (res.data.statusCode === 200) {
          setotpkey(res.data.otpKey);
          toast.success("OTP Sent Successfully", { autoClose: 1000 });
        } else {
          toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });

      });
  };

 

  return (
    <div className="backgroundImage-forgotpass">
      <div className="mainContent-forgotpass">
        <div className="container-forgotpass">


          <header className="header-forpass">
            <div>
              <img className="header-img-forpass" src={Logo} alt="chit-chat" />
            </div>
            <div onClick={() => { navigate("/home"); }}>Home</div>
            <div onClick={() => { navigate("/login"); }}>Login</div>
          </header>


          <div className="forgotPassword">

            <h1 className="h1-forpass">Forgot Password</h1>
            <p className="p-forpass">Please Enter your details</p>


            <div class="row">
              <div className="phonenumber">
                <input className="input-forpass" value={phoneNumber} onChange={phoneNumberHandler} placeholder="Phone Number" />
                <div className="phone-icon-forpass"></div>
              </div>
              <div className="otp-forpass" onClick={sendOTP}>Get OTP</div>
            </div>


            <div class="row">
              <div className="enter-otp">
                <input className="input-forpass" value={otp} onChange={otpHandler} placeholder="Enter OTP" />
              </div>
            </div>


            <div class="row">
              <div className="password-forgotpass">
              <input className="input-forpass" value={password} onChange={passwordHandler} type="password" placeholder="New Password"/>
              <div className="eye-icon-forpass"></div>
              </div>
            </div>


            <div class="row">
                <div className="password-forgotpass">
                <input className="input-forpass" value={confirmPassword} onChange={confirmPasswordHandler} type="password" placeholder="Confirm Password"/>
                <div className="eye-icon-forpass"></div>
                </div>
             
            </div>


            <div className="btnForgotPassword">
              <button onClick={changePasswordHandler}> Change Password</button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
