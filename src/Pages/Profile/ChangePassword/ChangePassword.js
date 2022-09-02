import React, { useState } from "react";
import "./ChangePassword.css";
import CloseIcon from "../../../Assets/cross.png";

function ChangePassword({ setShowModal }) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
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

  const otpClickHandler = (e) => {};

  const updateClickHandler = (e) => {
    setShowModal((prev) => {
      return { ...prev, contact: false };
    });
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
            style={{width:'22vw',marginTop:'1vh'}}
              className="contactmodalinput"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={onChangeHandler}
              placeholder="New Phone Number"
            />
          </div>

          <div className="phoneNumber">
            <input
            style={{width:'22vw',marginTop:'1vh'}}
              className="contactmodalinput"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={onChangeHandler}
              placeholder="New Phone Number"
            />
          </div>

          <div className="phoneNumber">
            <input
            style={{width:'22vw',marginTop:'1vh'}}
              className="contactmodalinput"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={onChangeHandler}
              placeholder="New Phone Number"
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
