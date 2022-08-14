import React from "react";
import axios from "axios";
import downloadDocument from "Assets/download-document.png";
import threeDot from "Assets/three-dot.png";
import displayImage from "Assets/display-image.png";
import starWhite from "Assets/star-white.svg";
import starBlack from "Assets/star-black.svg";
import { useDispatch } from "react-redux";
import {setReceiverDetails,loadCurrentChat,getStaredMessages} from "Redux/Actions/SingleChatActions"



function ReceivedMessages({ messagetype, payload ,chatid}) {

  const dispatch=useDispatch();


  const starMessage =() =>{

    axios
    .post('http://localhost:5000/chat/starmarkmessage',{
      chatid:chatid,
      messageid:payload.messageid
    })
    .then(res=>{
      if(res.data.statusCode === 200){
        // working
        dispatch(getStaredMessages(chatid));

      }
      else{
        // Something went wrong
      }
    })
    .catch(err=>{
      // something went wrong
    })
}

  if (messagetype === "normal-message") {


    return (
      <div className="single-message">
        <div className="single-message-content">{payload}</div>
      </div>
    );


  } else if (messagetype === "message") {


    return (
      <div className="single-message">
        <div className="single-message-content last-reveived-message">{payload.message}
        <div className="hover-star" onClick={starMessage}><img src={starBlack} alt='star'></img></div>
        </div>
        <div className="single-time-stamp">22:21 </div>
      </div>
    );


  } else if (messagetype === "normal-image") {

    
    return (
      <div className="single-image">
        <div className="single-image-content">
        <div className="hover-star" onClick={starMessage}><img src={starBlack} alt='star'></img></div>
          <div className="single-image-display"><img src={displayImage} alt=""></img></div>
          <div className="single-image-desc">Done Mate</div>
        </div>
        <div className="single-img-timestamp">22:21</div>
      </div>
    );


  } else if (messagetype === "image") {


    return (
      <div className="single-image">
        <div className="single-image-content last-reveived-message">
          <div className="single-image-display"><img src={displayImage} alt=""></img></div>
          <div className="single-image-desc">Done Mate</div>
        </div>
        <div className="single-img-timestamp">22:21</div>
      </div>
    );


  } else if (messagetype === "normal-document") {


    return (
      <div className="single-image">
        <div className="single-image-content document-flex">
          <div className="download-document-icon"><img src={downloadDocument} alt=""></img></div>
          <div className="group-document-details">
            <div className="single-document-name">tourist Location.pdf</div>
            <div className="single-document-detail">12MB <span>pdf</span></div>
          </div>
          <div className="three-dot-icon"><img src={threeDot} alt=""></img></div>
        </div>
        <div className="single-img-timestamp">22:21</div>
      </div>
    );


  } else if (messagetype === "document") {


    return (
      <div className="single-image">
        <div className="single-image-content last-reveived-message document-flex">
          <div className="download-document-icon"><img src={downloadDocument} alt=""></img></div>
          <div className="group-document-details">
            <div className="single-document-name">tourist Location.pdf</div>
            <div className="single-document-detail">12MB <span>pdf</span></div>
          </div>
          <div className="three-dot-icon"><img src={threeDot} alt=""></img></div>
        </div>
        <div className="single-img-timestamp">22:21</div>
      </div>
    );
  }
}

export default ReceivedMessages;
