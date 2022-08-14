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
import axios from "axios";

toast.configure();


function SentMessages({ messagetype, payload,chatid }) {

  const dispatch=useDispatch();


  const starMessage =() =>{
    debugger;
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

  if (messagetype === "normal-message") {

    return (
      <div className="single-message self-sent">
        <div className="single-message-content self single-flex">{payload.message}
          <div className="group-tick-icon">
            <img src={doubletick} alt=""></img>
          </div>
        </div>
        <div className="hover-star"><img src={starBlack} alt='star'></img></div>
      </div>
    );


  } else if (messagetype === "message") {


    return (
      <div className="single-message self-sent">
        <div className="single-time-stamp">{new Date(payload.timestamp).getHours() + ':' + new Date(payload.timestamp).getMinutes()}</div>
        <div className="single-message-content self last-sent-message single-flex">{payload.message}
          <div className="group-tick-icon" ><img src={doubletick} alt=""></img></div>
        <div className="hover-star" onClick={starMessage}><img src={starBlack} alt='star'></img></div>
        </div>

      </div>
    );


  } else if (messagetype === "normal-image") {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">22:21</div>
        <div className="single-image-content self ">
          <div className="single-image-display"><img src={displayImage} alt=""></img>
          </div>
          <div className="single-image-desc self-image single-flex">Done Mate
            <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
          </div>
        </div>
      </div>
    );


  } else if (messagetype === "image") {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">22:21</div>
        <div className="single-image-content self last-sent-message">
          <div className="single-image-display"><img src={displayImage} alt=""></img></div>
          <div className="single-image-desc self-image single-flex">Done Mate
            <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
          </div>
        </div>
      </div>
    );


  } else if (messagetype === "normal-document") {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">22:21</div>
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


  } else if (messagetype === "document") {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">22:21</div>
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
