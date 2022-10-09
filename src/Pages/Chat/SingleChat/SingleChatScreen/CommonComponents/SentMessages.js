import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getStaredMessages } from "Redux/Actions/SingleChatActions";
import CryptoJS from "crypto-js";
import doubletick from "Assets/double-tick.png";
import darkDocument from "Assets/dark-download.png";
import darkThreeDot from "Assets/dark-three-dot.png";
import starBlack from "Assets/star-black.svg";
import axios from "axios";

toast.configure();

function SentMessages({
  messagetype,
  payload,
  chatid,
  contactid,
  shouldBeRound,
}) {
  const dispatch = useDispatch();


  const getDesiredTimeStamp = (timestamp) => {
    return `${new Date(timestamp).getHours() < 10 ? "0" : ""}${new Date(
      timestamp
    ).getHours()}:${new Date(timestamp).getMinutes() < 10 ? "0" : ""}${new Date(
      timestamp
    ).getMinutes()}`;
  };


  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(message,process.env.REACT_APP_MESSAGE_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  };


  const downloadDocument = (documenturl, name) => {
    let url = `${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(documenturl)}`;
    let link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };


  const starMessage = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/chat/starmarkmessage`, {
        userid: localStorage.getItem("userid"),
        contactid: contactid,
        message: payload.message,
        timestamp: payload.timestamp,
        type: "sent",
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

  // Normal Message With round border
  if (messagetype === "message" && shouldBeRound) {
    return (
      <div className="single-message self-sent">
        <div className="single-message-content self single-flex">
          <div className="hover-star" onClick={starMessage}>
            <img src={starBlack} alt="star"></img>
          </div>
          {getDecryptedMessage(payload.message)}
          <div className="group-tick-icon">
            <img src={doubletick} alt=""></img>
          </div>
        </div>
      </div>
    );

    // normal Message with one side sharp edge
  } else if (messagetype === "message" && !shouldBeRound) {
    return (
      <div className="single-message self-sent">
        <div className="single-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="single-message-content self last-sent-message single-flex">
          <div className="hover-star" onClick={starMessage}>
            <img src={starBlack} alt="star"></img>
          </div>
          {getDecryptedMessage(payload.message)}
          <div className="group-tick-icon">
            <img src={doubletick} alt=""></img>
          </div>
        </div>
      </div>
    );

    // Normal image With round border
  } else if (messagetype === "image" && shouldBeRound) {
    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="single-image-content self ">
          <div className="single-image-display">
            <img
              src={`${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(payload.key)}`}
              alt=""
            ></img>
          </div>
          <div className="single-image-desc self-image single-flex">
            {getDecryptedMessage(payload.message)}
            <div className="group-tick-icon">
              <img src={doubletick} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );

    // normal image with one side sharp edge
  } else if (messagetype === "image" && !shouldBeRound) {
    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="single-image-content self last-sent-message">
          <div className="single-image-display">
            <img
              src={`${ process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(payload.key)}`}
              alt=""
            ></img>
          </div>
          <div className="single-image-desc self-image single-flex">
            {getDecryptedMessage(payload.message)}
            <div className="group-tick-icon">
              <img src={doubletick} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );

    // Normal document With round border
  } else if (messagetype === "document" && shouldBeRound) {
    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="single-image-content self  document-flex">
          <div className="download-document-icon">
            <img
              src={darkDocument}
              alt=""
              onClick={() =>
                downloadDocument(payload.key, payload.message.documentName)
              }
            ></img>
          </div>
          <div className="group-document-details">
            <div className="single-document-name self">
              {payload.message.documentName}
            </div>
            <div className="single-document-detail single-flex">
              <div>
                {payload.message.documentSize}{" "}
                <span>{payload.message.documentExtention}</span>
              </div>
              <div className="group-tick-icon">
                <img src={doubletick} alt=""></img>
              </div>
            </div>
          </div>
          <div className="three-dot-icon">
            <img src={darkThreeDot} alt=""></img>
          </div>
        </div>
      </div>
    );

    // normal document with one side sharp edge
  } else if (messagetype === "document" && !shouldBeRound) {
    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="single-image-content self last-sent-message document-flex">
          <div className="download-document-icon">
            <img
              src={darkDocument}
              alt=""
              onClick={() =>
                downloadDocument(payload.key, payload.message.documentName)
              }
            ></img>
          </div>
          <div className="group-document-details">
            <div className="single-document-name self">
              {payload.message.documentName}
            </div>
            <div className="single-document-detail single-flex">
              <div>
                {payload.message.documentSize}{" "}
                <span>{payload.message.documentExtention}</span>
              </div>
              <div className="group-tick-icon">
                <img src={doubletick} alt=""></img>
              </div>
            </div>
          </div>
          <div className="three-dot-icon">
            <img src={darkThreeDot} alt=""></img>
          </div>
        </div>
      </div>
    );
  }
}

export default SentMessages;
