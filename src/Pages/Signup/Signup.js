/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState,useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/Logo.png";
import eye from "Assets/enye.png";
import eyeClose from "Assets/eye-close.png";
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

  const [error, setError] = useState({
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    OTP: "",
  });

  const [otpkey, setotpkey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  let navigate = useNavigate();


  const onChangeHandler = (e) => {
    
    switch(e.target.name){
      case 'phoneNumber': {phoneNumberValidator(e.target.value)} break;
      case 'email': {emailVaildator(e.target.value)}  break;
      case 'password': {passwordValidator(e.target.value)} break;
      case 'confirmPassword': {confirmPasswordValidator(e.target.value)} break;
    }


    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  };





  // const onOTPChange =(otp) => {
  //   setFormData({...formData,OTP:otp})
  // }

  const sendOTP = () => {
    
    axios
      .post(`${process.env.REACT_APP_SERVER}/authentication/sendOTP`, {
        phonenumber: formData.phoneNumber,
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


  const createAccountHandler = () => {
    
    var decryptedotp = CryptoJS.AES.decrypt(otpkey,formData.phoneNumber).toString(CryptoJS.enc.Utf8);

    if (decryptedotp === formData.OTP) {

      axios
        .post(`${process.env.REACT_APP_SERVER}/authentication/signup`, formData)
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


  const phoneNumberValidator=(value)=>{
    let phonereg=/^[0-9]{10}$/
    let result=value.match(phonereg);
    if(!result){
      setError((prev)=>{return {...prev,phoneNumber:'Enter a valid phone number'}})
    }
    else{
      setError((prev)=>{return {...prev,phoneNumber:''}})
    }
  }

  const emailVaildator=(value)=>{
    let emailreg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let result=emailreg.test(value);

    
    if(!result){
      setError((prev)=>{return {...prev,email:'Enter a valid email address'}})
    }
    else{
      setError((prev)=>{return {...prev,email:''}})
    }
  }

  const passwordValidator=(value)=>{
    let passwordreg=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/   
    let result=value.match(passwordreg);
    if(!result){
      setError((prev)=>{return {...prev,password:'Enter a strong password'}})
    }
    else{
      setError((prev)=>{return {...prev,password:''}})
    }
  }

  const confirmPasswordValidator=(value)=>{
   
    let result=(formData.password ===value)
    if(!result){
      setError((prev)=>{return {...prev,confirmPassword:'Password does not match'}})
    }
    else{
      setError((prev)=>{return {...prev,confirmPassword:''}})
    }
  }


  return (

    <>

    <div className="backgroundImage">
      <div className="mainContent">
        <div className="container">

            <header className="signup-header">
              <div>
                <img className="header-img-signup" src={Logo} alt="chit-chat" />
              </div>
              <div onClick={() => { navigate("/home"); }}>Home</div>
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


            <>
            <div class="row">
              <div className="parentdiv email">
                <input className="sighup-input" name="email"  onChange={debounce(onChangeHandler,200)} type="email" placeholder="Enter Email" />
                <div className="base-icon email-icon"></div>
              </div>
            </div>
            {error.email && <span className="error-msg">{error.email}</span>}
            </>

            <>
            <div class="row">
              <div className="parentdiv phonenumber">
                <input className="sighup-input" name="phoneNumber" onChange={debounce(onChangeHandler,200)} placeholder="Phone Number" />
                <div className="base-icon phone-icon"></div>
              </div>
              <div className="otp" onClick={sendOTP}>Get OTP</div>
            </div>
            {error.phoneNumber && <span className="error-msg">{error.phoneNumber}</span>}
            </>
            



            <div class="row">
              <div className="parentdiv firstName">
                <input className="sighup-input" name="OTP"  onChange={debounce(onChangeHandler,200)} type="text" placeholder="Enter OTP" />
                {/* <OtpInput value={formData.OTP} onChange={onOTPChange} numInputs={6} separator={<span> </span>} /> */}

              </div>
            </div>


            <>
            <div class="row">
              <div className="parentdiv password">
                <input className="sighup-input" name="password"  onChange={debounce(onChangeHandler,200)} type={showPassword?'text':'password'} placeholder="Enter Password" />
                <div className="base-icon password-icon" onClick={() => setShowPassword(!showPassword)}><img src={showPassword?eyeClose:eye} alt="show-Password"></img></div>
              </div>
            </div>
            {error.password && <span className="error-msg">{error.password}</span>}
            </> 
            

            <>
            <div class="row">
              <div className="parentdiv confpassword">
                <input className="sighup-input" name="confirmPassword"  onChange={debounce(onChangeHandler,200)} type={showConfirmPassword?'text':'password'} placeholder="Confirm Password" />
                <div className="base-icon eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}><img src={showConfirmPassword?eyeClose:eye} alt="show-Password"></img></div>
              </div>
            </div>
            {error.confirmPassword && <span className="error-msg">{error.confirmPassword}</span>}
            </>
            
            <div className="btnSignup">
              <button disabled={error.password || error.confirmPassword || error.phoneNumber || error.email} onClick={createAccountHandler}> Create Account</button>
            </div>

          </div>
        </div>
      </div>
    </div></>
  );
}

export default Signup;
