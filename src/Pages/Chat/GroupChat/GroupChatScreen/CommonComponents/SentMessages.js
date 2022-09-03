import React,{useState} from "react";
import displayImage from "Assets/display-image.png";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import AWS from 'aws-sdk'
import doubletick from "Assets/double-tick.png";
import darkDocument from "Assets/dark-download.png";
import darkThreeDot from "Assets/dark-three-dot.png";
import starBlack from "Assets/star-black.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getGroupStaredMessages } from "Redux/Actions/GroupChatActions";

toast.configure();

function SentMessages({ messagetype, payload, shouldBeRound, groupid }) {

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECERET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });
  
  const dispatch = useDispatch();

  const [image,setImage] = useState('');


  const getDesiredTimeStamp = (timestamp) => {
    return (new Date(timestamp).getHours() + ":" + new Date(timestamp).getMinutes());
  };

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(message,process.env.REACT_APP_MESSAGE_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  };


  const getImageFromKey = (key) => {
    myBucket.getObject({ 
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
     Key: key},

     (err,data) => {

      if(err)
      setImage(null);

      setImage(`data:image/png;base64,${data.Body.toString('base64')}`);

   })
  }


  const downloadDocumentToLocal = (documenturl) => {
    let url = `https://chitchatcommunicationn.s3.ap-south-1.amazonaws.com/${encodeURIComponent(documenturl)}`;

    let link = document.createElement('a');
    link.href = url;
    link.click();
    
  }


  const starMessage = () => {

    axios
      .post(`${process.env.REACT_APP_SERVER}/group/starmarkmessage`, {
        userid: localStorage.getItem("userid"),
        groupid: groupid,
        message: payload.message,
        timestamp: payload.timestamp,
        type: "sent",
      })
      .then((res) => {
        if (res.data.statusCode === 200) {

          toast.success(res.data.message, { autoClose: 1000 });
          dispatch(getGroupStaredMessages(groupid));

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
      <div className="group-message self-sent">
        <div className="group-message-image"></div>
        <div className="group-message-content self group-flex">
          <div className="hover-star" onClick={starMessage}><img src={starBlack} alt="star"></img></div>
          <div className="group-message-message self group-flex">
            {getDecryptedMessage(payload.message)}
            <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
          </div>
        </div>
      </div>
    );
  } else if (messagetype === "message" && !shouldBeRound) {
    return (
      <div className="group-message self-sent">
        <div className="group-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="group-message-content self last-sent-message group-flex">
          <div className="hover-star" onClick={starMessage}>
            <img src={starBlack} alt="star"></img>
          </div>
          <div className="group-message-message self group-flex">
            {getDecryptedMessage(payload.message)}{" "}
            <div className="group-tick-icon">
              <img src={doubletick} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (messagetype === "image" && shouldBeRound) {
    return (
      <div className="group-message self-sent">
        <div className="group-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="group-image-content self last-sent-message">
          <div className="group-image-display">
          {getImageFromKey(payload.key)}
            <img src={image} alt=""></img>
          </div>
          <div className="group-image-desc self group-flex">
            {getDecryptedMessage(payload.message)}
            <div className="group-tick-icon">
              <img src={doubletick} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (messagetype === "image" && !shouldBeRound) {
    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">
          {new Date(payload.timestamp).getHours() +
            ":" +
            new Date(payload.timestamp).getMinutes()}
        </div>
        <div className="single-image-content self last-sent-message">
          <div className="single-image-display">
            {getImageFromKey(payload.key)}
            <img src={image} alt=""></img>
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
  } else if (messagetype === "document") {
    return (
      <div className="group-message self-sent">
        <div className="group-time-stamp">
          {getDesiredTimeStamp(payload.timestamp)}
        </div>
        <div className="group-image-content self last-sent-message">
          <div className="group-document-header align-end">
            <div className="three-dot-icon">
              <img src={darkThreeDot} alt=""></img>
            </div>
          </div>
          <div className="group-document-content ">
            <div className="download-document-icon" onClick={() => downloadDocumentToLocal(payload.key)}>
              <img src={darkDocument} alt=""></img>
            </div>
            <div className="group-document-details">
              <div className="group-document-name self">
                {payload.message.documentName}
              </div>
              <div className="group-document-detail single-tick-document-sent group-flex">
                <div>
                  {payload.message.documentSize}{" "}
                  <span>{payload.message.documentExtention}</span>
                </div>{" "}
                <div className="group-tick-icon">
                  <img src={doubletick} alt=""></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SentMessages;
