import React, {useState, useEffect } from "react";
import displayImage from "Assets/display-image.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import AWS from 'aws-sdk'
import {getStaredMessages} from "Redux/Actions/SingleChatActions"
import CryptoJS from "crypto-js";
import doubletick from "Assets/double-tick.png";
import darkDocument from "Assets/dark-download.png";
import darkThreeDot from "Assets/dark-three-dot.png";
import starBlack from "Assets/star-black.svg";

import axios from "axios";

toast.configure();


function SentMessages({ messagetype, payload,chatid,contactid,shouldBeRound }) {

  AWS.config.update({
    accessKeyId: 'AKIAZVTSLHVBBB6G7TOL',
    secretAccessKey: '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'
  });
  
  const myBucket = new AWS.S3({
    params: { Bucket: 'chitchatcommunication'},
    region: 'ap-south-1',
  })


  const dispatch=useDispatch();

  const [image,setImage] = useState('');

  const getDesiredTimeStamp = (timestamp) => {
    return new Date(timestamp).getHours() + ':' + new Date(timestamp).getMinutes()
  }

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(message,process.env.REACT_APP_MESSAGE_SECRET_KEY).toString(CryptoJS.enc.Utf8)
  }

  const getImageFromKey = (key) => {
    myBucket.getObject({ 
      Bucket: 'chitchatcommunication',
     Key: key},

     (err,data) => {

      if(err)
      setImage(null);

      setImage(`data:image/png;base64,${data.Body.toString('base64')}`);

   })
  }
  
  const starMessage =() =>{
      axios
      .post(`${process.env.REACT_APP_SERVER}/chat/starmarkmessage`,{
        userid:localStorage.getItem('userid'),
        contactid:contactid,
        message:payload.message,
        timestamp:payload.timestamp,
        type:'sent'
      })
      .then(res=>{
        if(res.data.statusCode === 200){

          toast.success(res.data.message, { autoClose: 1000 });
          dispatch(getStaredMessages(chatid));

        }
        else{
          toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });

        }
      })
      .catch(err=>{
        toast.error("Oops! Something Went Wrong!", { autoClose: 1000 });

      })
  }

  if (messagetype === "message" && shouldBeRound) {

    return (
      <div className="single-message self-sent">
        <div className="single-message-content self single-flex">
        <div className="hover-star" onClick={starMessage}><img src={starBlack} alt='star'></img></div>
          {getDecryptedMessage(payload.message)}
          <div className="group-tick-icon">
            <img src={doubletick} alt=""></img>
          </div>
        </div>
      </div>
    );


  } else if (messagetype === "message" && !shouldBeRound) {


    return (
      <div className="single-message self-sent">
        <div className="single-time-stamp">{getDesiredTimeStamp(payload.timestamp)}</div>
        <div className="single-message-content self last-sent-message single-flex">
        <div className="hover-star" onClick={starMessage}><img src={starBlack} alt='star'></img></div>
          {getDecryptedMessage(payload.message)}
          <div className="group-tick-icon" ><img src={doubletick} alt=""></img></div>
        </div>

      </div>
    );


  } else if (messagetype === "image" && shouldBeRound) {


    return (
      <div className="single-image self-sent">
       
        <div className="single-img-timestamp">{getDesiredTimeStamp(payload.timestamp)}</div>
        <div className="single-image-content self ">
        {getImageFromKey(payload.key)}
          <div className="single-image-display"><img src={image} alt=""></img>
          </div>
          <div className="single-image-desc self-image single-flex">{getDecryptedMessage(payload.message)}
            <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
          </div>
        </div>
      </div>
    );


  } else if (messagetype === "image" && !shouldBeRound) {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">{getDesiredTimeStamp(payload.timestamp)}</div>
        <div className="single-image-content self last-sent-message">
        {getImageFromKey(payload.key)}
          <div className="single-image-display"><img src={image} alt=""></img></div>
          <div className="single-image-desc self-image single-flex">{getDecryptedMessage(payload.message)}
            <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
          </div>
        </div>
      </div>
    );


  } else if (messagetype === "document" && shouldBeRound) {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">{getDesiredTimeStamp(payload.timestamp)}</div>
        <div className="single-image-content self  document-flex">
          <div className="download-document-icon"><img src={darkDocument} alt=""></img></div>
          <div className="group-document-details">
            <div className="single-document-name self">{payload.message.documentName}</div>
            <div className="single-document-detail single-flex">
              <div>{payload.message.documentSize} <span>{payload.message.documentExtention}</span></div>
              <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
            </div>
          </div>
          <div className="three-dot-icon"><img src={darkThreeDot} alt=""></img></div>
        </div>
      </div>
    );


  } else if (messagetype === "document" && !shouldBeRound) {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">{getDesiredTimeStamp(payload.timestamp)}</div>
        <div className="single-image-content self last-sent-message document-flex">
          <div className="download-document-icon"><img src={darkDocument} alt=""></img></div>
          <div className="group-document-details">
            <div className="single-document-name self">{payload.message.documentName}</div>
            <div className="single-document-detail single-flex">
              <div>{payload.message.documentSize} <span>{payload.message.documentExtention}</span></div>
              <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
            </div>
          </div>
          <div className="three-dot-icon"><img src={darkThreeDot} alt=""></img></div>
        </div>
      </div>
    );


  }
}

export default SentMessages;
