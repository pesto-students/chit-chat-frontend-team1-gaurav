import React,{useState} from 'react'
import './ChangePassword.css';
import  CloseIcon from '../../../Assets/cross.png'

function ChangePassword({ setShowModal }) {
    const [formData, setFormData] = useState({
        phoneNumber: "",
        otp: ""
      });
    
      const onChangeHandler = (e) => {
        formData[e.target.name] = e.target.value;
        setFormData({ ...formData });
      };
    
      const closeModalHandler = (e) => {
        console.log("close the modal");
        setShowModal((prev) => {
          return { ...prev, password: false };
        });
      };
    
      const otpClickHandler = (e) => {
        console.log("phonenumber", formData.phoneNumber);
      };
    
      const updateClickHandler = (e) => {
        console.log("data", formData);
        setShowModal((prev) => {
          return { ...prev, contact: false };
        });
      };
    
      return (
        <div className="changeContactContainer">
          <div className="heading">
            <span> ChangeContact</span>
            <img onClick={closeModalHandler} src={CloseIcon} />
          </div>
          <div className="form">
            <div className="phoneNumber">
              <input
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={onChangeHandler}
                placeholder="New Phone Number"
              />
              <button onClick={otpClickHandler}>Send OTP</button>
            </div>
    
            <div className="firstName">
              <input
                value={formData.otp}
                onChange={onChangeHandler}
                name="otp"
                placeholder="Enter OTP"
              />
            </div>
    
            <button onClick={updateClickHandler} className="updateButton">
              Update
            </button>
          </div>
        </div>
      );
}

export default ChangePassword