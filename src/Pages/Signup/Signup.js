/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
// import OtpInput from 'react-otp-input';
import Logo from "../../Assets/Logo.png";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

toast.configure();

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    OTP: "",
  });

  const [otpkey, setotpkey] = useState("");


  let navigate = useNavigate();


  const onChangeHandler = (e) => {

    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  };





  // const onOTPChange =(otp) => {
  //   setFormData({...formData,OTP:otp})
  // }

  const sendOTP = () => {
    
    axios
      .post("http://localhost:5000/authentication/sendOTP", {
        phonenumber: formData.phoneNumber,
      })
      .then((res) => {
        console.clear();
        console.log(res);

        if (res.data.statusCode === 200) {
          setotpkey(res.data.otpKey);
          toast.success("OTP Sent Successfully", { autoClose: 1000 });
        } else {
          toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        console.clear();
        console.log(err);
        toast.warning("Oops! Something Went Wrong!", { autoClose: 1000 });

      });
  };


  const createAccountHandler = () => {
    
    var decryptedotp = CryptoJS.AES.decrypt(otpkey,formData.phoneNumber).toString(CryptoJS.enc.Utf8);

    if (decryptedotp === formData.OTP) {

      axios
        .post("http://localhost:5000/authentication/signup", formData)
        .then((res) => {
          
          if(res.data.responseCode === 200){
            toast.success("User Registered Successfull", { autoClose: 1000 });
            navigate("/login");
          }
          else if(res.data.responseCode === 202){
            toast.warning("User With given Mobile No. is Already Registered", { autoClose: 2000 });
          }
          else{
            toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
          }
        })
        .catch((err) => {
          
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
        });
    } else {
      toast.warning("Incorrect OTP", { autoClose: 1000 });
    }
  };



  return (

    <>

    <div className="backgroundImage">
      <div className="mainContent">
        <div className="container">

            <header className="signup-header">
              <div>
                <img className="header-img-signup" src={Logo} alt="chit-chat" />
              </div>
              <div onClick={() => { navigate("/"); }}>Home</div>
              <div onClick={() => { navigate("/login"); }}>Get Started</div>
            </header>

          <div className="signup">
            <p>Start For Free</p>
            <h1 className="h1-signup">Create New Account</h1>
            <div className="login-link">
              Already a member?{" "}
              <a onClick={() => { navigate("/login"); }}> Log in? </a>
            </div>

            <div class="row">
              <div className="fullname">
                <input className="sighup-input" name="firstName" onChange={debounce(onChangeHandler,200)} type="text" placeholder="Full Name" />
                {/* <span className="error-message">error message here</span> */}
                <div className="base-icon user-icon-fullname"></div>
              </div>


              <div>
                <div className="username">
                  <input className="sighup-input" name="userName"  onChange={debounce(onChangeHandler,200)} type="text" placeholder="User Name" />
                  <div className="base-icon user-icon-fullname"></div>
                </div>
              </div>
            </div>



            <div class="row">
              <div className="parentdiv email">
                <input className="sighup-input" name="email"  onChange={debounce(onChangeHandler,200)} type="email" placeholder="Enter Email" />
                <div className="base-icon email-icon"></div>
              </div>
            </div>



            <div class="row">
              <div className="parentdiv phonenumber">
                <input className="sighup-input" name="phoneNumber" onChange={debounce(onChangeHandler,200)} placeholder="Phone Number" />
                <div className="base-icon phone-icon"></div>
              </div>
              <div className="otp" onClick={sendOTP}>Get OTP</div>
            </div>



            <div class="row">
              <div className="parentdiv firstName">
                <input className="sighup-input" name="OTP"  onChange={debounce(onChangeHandler,200)} type="text" placeholder="Enter OTP" />
                {/* <OtpInput value={formData.OTP} onChange={onOTPChange} numInputs={6} separator={<span> </span>} /> */}

              </div>
            </div>



            <div class="row">
              <div className="parentdiv password">
                <input className="sighup-input" name="password"  onChange={debounce(onChangeHandler,200)} type="password" placeholder="Enter Password" />
                <div className="base-icon password-icon"></div>
              </div>
            </div>


            <div class="row">
              <div className="parentdiv confpassword">
                <input className="sighup-input" name="confirmPassword"  onChange={debounce(onChangeHandler,200)} type="password" placeholder="Confirm Password" />
                <div className="base-icon eye-icon"></div>
              </div>
            </div>



            <div className="btnSignup">
              <button onClick={createAccountHandler}> Create Account</button>
            </div>

          </div>
        </div>
      </div>
    </div></>
  );
}

export default Signup;
