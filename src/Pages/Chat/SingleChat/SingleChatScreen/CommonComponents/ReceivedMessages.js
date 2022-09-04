import React from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import downloadDocument from "Assets/download-document.png";
import threeDot from "Assets/three-dot.png";
import starWhite from "Assets/star-white.svg";
import starBlack from "Assets/star-black.svg";
import { useDispatch } from "react-redux";
import { getStaredMessages } from "Redux/Actions/SingleChatActions";

toast.configure();

function ReceivedMessages({
  messagetype,
  payload,
  chatid,
  contactid,
  shouldBeRound,
}) {

  const dispatch = useDispatch();


  const getDesiredTimeStamp = (timestamp) => {
    return (new Date(timestamp).getHours() + ":" + new Date(timestamp).getMinutes());
  };


  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt( message,process.env.REACT_APP_MESSAGE_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  };


  const downloadDocumentToLocal = (documenturl) => {
    debugger;
    let url = `${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(documenturl)}`;
    let link = document.createElement("a");
    link.href = url;
    link.click();
  };


  const starMessage = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/chat/starmarkmessage`, {
        userid: localStorage.getItem("userid"),
        contactid: contactid,
        message: payload.message,
        timestamp: payload.timestamp,
        type: "received",
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success(res.data.message, { autoClose: 1000 });

          dispatch(getStaredMessages(chatid));
        } else {
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });
      });
  };

  if (messagetype === "message" && shouldBeRound) {
    return (
      <div className="single-message ">
        <div className="single-message-content  single-flex">
          {getDecryptedMessage(payload.message)}
          <div className="hover-star-white" onClick={starMessage}>
            <img src={starWhite} alt="star"></img>
          </div>
        </div>
      </div>
    );
  } else if (messagetype === "message" && !shouldBeRound) {
    return (
      <div className="single-message">
        <div className="single-message-content last-reveived-message single-flex">
          {getDecryptedMessage(payload.message)}
          <div className="hover-star-white" onClick={starMessage}>
            <img src={starWhite} alt="star"></img>
          </div>
        </div>
        <div className="single-time-stamp">
          <div className="hover-star" onClick={starMessage}>
            <img src={starWhite} alt="star"></img>
          </div>
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );
  } else if (messagetype === "image" && shouldBeRound) {
    return (
      <div className="single-image">
        <div className="single-image-content">
          <div className="single-image-display">
            <img
              src={`${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(payload.key)}`}
              alt=""
            ></img>
          </div>
          <div className="single-image-desc">
            {getDecryptedMessage(payload.message)}
          </div>
        </div>
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );
  } else if (messagetype === "image" && !shouldBeRound) {
    return (
      <div className="single-image">
        <div className="single-image-content last-reveived-message">
          <div className="single-image-display">
            <img
              src={`${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(payload.key)}`}
              alt=""
            ></img>
          </div>
          <div className="single-image-desc">
            {getDecryptedMessage(payload.message)}
          </div>
        </div>
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );
  } else if (messagetype === "document" && shouldBeRound) {
    return (
      <div className="single-image">
        <div className="single-image-content document-flex">
          <div
            className="download-document-icon"
            onClick={() => downloadDocumentToLocal(payload.key)}
          >
            <img src={downloadDocument} alt=""></img>
          </div>
          <div className="group-document-details">
            <div className="single-document-name">
              {payload.message.documentName}
            </div>
            <div className="single-document-detail">
              {payload.message.documentSize}{" "}
              <span>{payload.message.documentExtention}</span>
            </div>
          </div>
          <div className="three-dot-icon">
            <img src={threeDot} alt=""></img>
          </div>
        </div>
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );
  } else if (messagetype === "document" && !shouldBeRound) {
    return (
      <div className="single-image">
        <div className="single-image-content last-reveived-message document-flex">
          <div
            className="download-document-icon"
            onClick={() => downloadDocumentToLocal(payload.key)}
          >
            <img src={downloadDocument} alt=""></img>
          </div>
          <div className="group-document-details">
            <div className="single-document-name">
              {payload.message.documentName}
            </div>
            <div className="single-document-detail">
              {payload.message.documentSize}{" "}
              <span>{payload.message.documentExtention}</span>
            </div>
          </div>
          <div className="three-dot-icon">
            <img src={threeDot} alt=""></img>
          </div>
        </div>
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
      </div>
    );
  }
}

export default ReceivedMessages;
