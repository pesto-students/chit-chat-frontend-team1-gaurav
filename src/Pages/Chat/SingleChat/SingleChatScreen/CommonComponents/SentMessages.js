import React from "react";
import displayImage from "Assets/display-image.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {setReceiverDetails,loadCurrentChat,getStaredMessages} from "Redux/Actions/SingleChatActions"
import CryptoJS from "crypto-js";
import singletick from "Assets/single-tick.png";
import doubletick from "Assets/double-tick.png";
import doubletickread from "Assets/double-tick-read.png";
import darkDocument from "Assets/dark-download.png";
import darkThreeDot from "Assets/dark-three-dot.png";
import starBlack from "Assets/star-black.svg";
import starWhite from "Assets/star-white.svg";

import axios from "axios";

toast.configure();


function SentMessages({ messagetype, payload,chatid,shouldBeRound }) {

  const dispatch=useDispatch();

  const getDesiredTimeStamp = (timestamp) => {
    return new Date(timestamp).getHours() + ':' + new Date(timestamp).getMinutes()
  }

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(message,'dhruvin').toString(CryptoJS.enc.Utf8)
  }

  const starMessage =() =>{
      axios
      .post('http://localhost:5000/chat/starmarkmessage',{
        chatid:chatid,
        messageid:payload.messageid
      })
      .then(res=>{
        if(res.data.statusCode === 200){

          toast.success("Message Marked Successfully!", { autoClose: 1000 });

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
          <div className="single-image-display"><img src={payload.url} alt=""></img>
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
          <div className="single-image-display"><img src={payload.url} alt=""></img></div>
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
            <div className="single-document-name self">tourist Location.pdf</div>
            <div className="single-document-detail single-flex">
              <div>12MB <span>pdf</span></div>
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
            <div className="single-document-name self">tourist Location.pdf</div>
            <div className="single-document-detail single-flex">
              <div>12MB <span>pdf</span></div>
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
