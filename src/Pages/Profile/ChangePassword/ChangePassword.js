import React, { useState } from "react";
import "./ChangePassword.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CloseIcon from "../../../Assets/cross.png";
import axios from "axios";

toast.configure();

function ChangePassword({ setShowModal }) {
  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const onChangeHandler = (e) => {
    formData[e.target.name] = e.target.value;
    setFormData({ ...formData });
  };

  const closeModalHandler = (e) => {
    setShowModal((prev) => {
      return { ...prev, password: false };
    });
  };

  const updateClickHandler = (e) => {
    if (formData.oldpassword === "") {
      toast.warning("Please Enter Old Password", { autoClose: 1000 });
    } else if (formData.newpassword === "") {
      toast.warning("Please Enter New Password", { autoClose: 1000 });
    } else if (formData.confirmpassword === "") {
      toast.warning("Please Enter Confirm Password", { autoClose: 1000 });
    } else if (formData.newpassword !== formData.confirmpassword) {
      toast.warning("New Password and Confirm Password Should be same!", {
        autoClose: 1000,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER}/authentication/changepassword`, {
          userid: localStorage.getItem("userid"),
          oldpassword: formData.oldpassword,
          newpassword: formData.newpassword,
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            toast.success(res.data.message, { autoClose: 1000 });
            setShowModal((prev) => {
              return { ...prev, password: false };
            });
          } else if (res.data.statusCode === 202) {
            toast.warning("Please Enter Correct Old Password!", {
              autoClose: 1000,
            });
          }
        })
        .catch((err) => {
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
        });
    }
  };

  return (
    <>
      <div className="modal-background"></div>
      <div className="changepasswordContainer">
        <div className="heading">
          <span> ChangeContact</span>
          <img onClick={closeModalHandler} src={CloseIcon} alt="" />
        </div>
        <div className="form">
          <div className="phoneNumber">
            <input
              style={{ width: "22vw", marginTop: "1vh" }}
              className="contactmodalinput"
              value={formData.oldpassword}
              name="oldpassword"
              onChange={onChangeHandler}
              placeholder="Enter Old Password"
            />
          </div>

          <div className="phoneNumber">
            <input
              style={{ width: "22vw", marginTop: "1vh" }}
              className="contactmodalinput"
              value={formData.newpassword}
              name="newpassword"
              onChange={onChangeHandler}
              placeholder="Enter New Password"
            />
          </div>

          <div className="phoneNumber">
            <input
              style={{ width: "22vw", marginTop: "1vh" }}
              className="contactmodalinput"
              value={formData.confirmpassword}
              name="confirmpassword"
              onChange={onChangeHandler}
              placeholder="Confirm New Password"
            />
          </div>

          <button onClick={updateClickHandler} className="updateButton">
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
