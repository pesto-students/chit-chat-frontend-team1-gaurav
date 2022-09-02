import React, { useEffect, useState,useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ChangePassword from "./ChangePassword/ChangePassword";
import ChangeContact from "./Change Contact/ChangeContact";
import profileimg from "Assets/profile.png";
import editIcon from "Assets/edit-profile.png";
import SideBar from "Common/SideBar/SideBar";
import ProfileEditBlack from "Assets/profileeditblack.png";
import "./Profile.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

toast.configure();

function Profile() {
  let navigate = useNavigate();
  let usernameRef = useRef();
  let fullnameRef = useRef();
  let emailRef = useRef();

  const [profileDetails, setProfileDetails] = useState({
    userName: "",
    fullName: "",
    email: "",
    contact: "",
    password: "......",
    profileImg: "",
  });

  const [showModal, setShowModal] = useState({
    contact: false,
    password: false,
  });

  const [editStatus, setEditStatus] = useState({
    userName: true,
    fullName: true,
    email: true,
  });

  const onChangeHandler = (e) => {
    profileDetails[e.target.name] = e.target.value;
    setProfileDetails({ ...profileDetails });
  };

  const fileInputHandler = (e) => {
    setProfileDetails((prevState) => {
      return { ...prevState, profileImg: e.target.files[0] };
    });
  };

 
  const editUserNameHandler = (e) => {
    debugger;
    setEditStatus({...editStatus,userName:!editStatus.userName});
    if(editStatus.userName === true)
    usernameRef.current.focus();
    // alert('hello')
  }
  const editFullNameHandler = (e) => {
    setEditStatus({...editStatus,fullName:!editStatus.fullName});

  }
  const editEmailHandler = (e) => {
    setEditStatus({...editStatus,email:!editStatus.email})
  }

  const changeContact = (number) => {
    setProfileDetails((prev) => {
      return { ...prev, contact: number };
    });
  };

  const updateClickHandler = (e) => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/authentication/editprofile`, {
        userid: localStorage.getItem("userid"),
        firstName: profileDetails.fullName,
        userName: profileDetails.userName,
        email: profileDetails.email,
        phoneNumber: profileDetails.contact,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success("Profile Updated Successfully!", { autoClose: 1000 });
        } else {
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });
  };

  useEffect(() => {

    var JWTtoken = localStorage.getItem('token');

    if(JWTtoken)
    {
      var jwtPayload = JSON.parse(window.atob(JWTtoken.split('.')[1]))
  
      var tokenExpired = (jwtPayload.exp*1000) <= Date.now();

      if(!tokenExpired){

        axios
        .post(`${process.env.REACT_APP_SERVER}/authentication/getprofile`, {
          userid: localStorage.getItem("userid"),
        })
        .then((res) => {
          setProfileDetails({
            ...Profile,
            userName: res.data.username,
            fullName: res.data.fullname,
            email: res.data.email,
            contact: res.data.phonenumber,
          });
        })
        .catch((err) => {
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
        });

      }
      else{
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        toast.warning('You Are Logged out Please Login..!',{autoClose:2000})
        navigate('/');
      }
    }
    else{

      toast.warning('You Are Logged out Please Login..!',{autoClose:2000})
      navigate('/');
    }

  }, []);

  return (
    <div className="profilePageContainer">
      <div className="sidebar"><SideBar/></div>

      <div className="Profilepage-sub-container">
        <div className="profilepage-content">

            <h1 className="my-profile">My profile</h1>


            <div className="profileCard">

              <div className="profilePic">

                <input accept="image/*" onChange={fileInputHandler} id="file" style={{ visibility: "hidden", position: "absolute" }} type="file" />

                <label style={{ cursor: "pointer" }} for="file">
                  <img className="profilepic-image" src={!profileDetails.profileImg && profileimg} alt="" />
                  <img className="profileImgEdit" src={editIcon} alt=""/>
                </label>

              </div>


              <div className="username-profile">
                <input disabled={editStatus.userName} ref={usernameRef} onChange={onChangeHandler} name="userName" value={profileDetails.userName}/>
                <img name="userName" onClick={editUserNameHandler} className="usernameEdit" src={editIcon} alt=""/>
              </div>
            </div> 


             <div className="profile-details">

                 <div className="inner-profile">

                    <div className="left-profile">
                        <label>Full name</label>
                        <input disabled={editStatus.fullName} ref={fullnameRef} onChange={onChangeHandler} name="fullName" value={profileDetails.fullName}/>
                    </div>
                    <button onClick={editFullNameHandler} name="fullName">Edit</button>

                 </div>
                  
                 <div className="inner-profile">

                        <div className="left-profile">
                            <label>Email</label>
                            <input disabled={editStatus.email} onChange={onChangeHandler} ref={emailRef} name="email" type="email" value={profileDetails.email} />
                        </div>
                        <button onClick={editEmailHandler} name="email">Edit</button>

                </div>

                <div className="inner-profile">

                        <div className="left-profile">
                            <label>Contact</label>
                            <input onChange={onChangeHandler} disabled={true} name="contact" value={profileDetails.contact}/>
                        </div>
                        <button onClick={() => { setShowModal((prev) => { return { ...prev, contact: true };});}} name="contact"> Edit</button>

                </div>

                <div className="inner-profile">

                    <div className="left-profile">
                        <label>Password</label>
                        <input onChange={onChangeHandler} disabled={true} name="password" type="password" value={profileDetails.password}/>
                    </div>
                    <button onClick={() => { setShowModal((prev) => { return { ...prev, password: true };});}} name="password">Change</button>

                </div>

             </div>

             <button onClick={updateClickHandler} className="updateButton-profile">{" "}Update{" "}</button>

        </div>
              {showModal.contact && <ChangeContact setShowModal={setShowModal} />}
              {showModal.password && <ChangePassword setShowModal={setShowModal} />}
  
      </div>
      </div>
);
}

export default Profile;
