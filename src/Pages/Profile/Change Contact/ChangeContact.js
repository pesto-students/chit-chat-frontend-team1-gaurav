import React, { useState } from "react";
import "./ChangeContact.css";
import CloseIcon from "../../../Assets/cross.png";

function ChangeContact({ setShowModal }) {
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
      return { ...prev, contact: false };
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
    <div className="modal-background">
    </div>
     <div className="changeContactContainer">
     <div className="heading">
       <span> ChangeContact</span>
       <img onClick={closeModalHandler} src={CloseIcon} alt="" />
     </div>
     <div className="form">
       <div className="phoneNumber">
         <input
         style={{width:'15vw',marginTop:'1vh'}}
           value={formData.phoneNumber}
           className="contactmodalinput"
           name="phoneNumber"
           onChange={onChangeHandler}
           placeholder="New Phone Number"
         />
         <button onClick={otpClickHandler}>Send OTP</button>
       </div>

       <div className="firstName">
         <input
           style={{width:'22vw',marginTop:'1vh'}}
           value={formData.otp}
           onChange={onChangeHandler}
           className="contactmodalinput"
           name="otp"
           placeholder="Enter OTP"
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

export default ChangeContact;
