/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import Logo from "../../Assets/Logo.png";
import VideoScreen from "../../Common/VideoScreen/VideoScreen";


toast.configure();



function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error,setError]=useState({phoneNumber:'',password:''});

  let navigate = useNavigate();

  const phoneNumberHandler = (e) => {
    phoneNumberValidator(e.target.value)
    setPhoneNumber(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const phoneNumberValidator=(value)=>{
  let phonereg=/^[0-9]*$/
  let result=value.match(phonereg);
  console.log('here',result,value)
  if(!result){
    setError((prev)=>{return {...prev,phoneNumber:'Enter a valid phone number'}})
  }
  else{
    setError((prev)=>{return {...prev,phoneNumber:''}})
  }
  }

  const loginHandler = () => {
    
    axios
      .post(`${process.env.REACT_APP_SERVER}/authentication/login`, {
        phoneNumber: phoneNumber,
        password: password,
      })
      .then((res) => {
        
        if(res.data.statusCode === 200){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userid',res.data.userid);
          localStorage.setItem('username',res.data.username);

          if(localStorage.getItem('order') === undefined || localStorage.getItem('order') === '' || localStorage.getItem('order') === null){
            localStorage.setItem('order',JSON.stringify(['',0]));
          }

          if(localStorage.getItem('grouporder') === undefined || localStorage.getItem('grouporder') === '' || localStorage.getItem('grouporder') === null){
            localStorage.setItem('grouporder',JSON.stringify(['',0]));
          }

          toast.success("Logged in Successfully!!", { autoClose: 1000 });
          navigate("/chat");
        }
        else if(res.data.statusCode === 202){
          toast.warning("Invalid Credentials!", { autoClose: 1000 });
        }
        else{
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });

  };

  return (
    <div className="backgroundImage-login">
      <div className="mainContent-login">
        <div className="container-login">


          <header className="login-header">
            <div>
              <img className="login-header-img" src={Logo} alt="chit-chat"/>
            </div>
            <div onClick={() => { navigate("/"); }}>Home</div>
            <div onClick={() => { navigate("/signup"); }}>Sign Up</div>
          </header>


          <div className="login">

            <h1 className="h1">Welcome Back</h1>

            <span className="span">Please enter your details</span>
            <>
            <div class="row login-phone">
              <input className="input-login" name='phone-number' value={phoneNumber} onChange={phoneNumberHandler} placeholder="Phone Number"/>
              <div className="phone-icon-login"></div>
            </div>
           {error.phoneNumber && <span className="error-msg">{error.phoneNumber}</span>}
            </>

            <div class="row login-pass">
              <input className="input-login" value={password} onChange={passwordHandler}  type="password" placeholder="Enter Password"/>
              <div className="password-icon-login"></div>
            </div>


            <div className="forgotPassword-login"> Forgot Password?{" "}
              <a href="#" onClick={() => { navigate("/forgotpassword");}}> Click Here </a>
            </div>


            <div className="btnLogin">
              <button disabled={error.phoneNumber} onClick={loginHandler}>Log In</button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
