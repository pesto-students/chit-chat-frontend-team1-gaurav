import React from "react";
import displayImage from "Assets/display-image.png";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import singletick from "Assets/single-tick.png";
import doubletick from "Assets/double-tick.png";
import doubletickread from "Assets/double-tick-read.png";
import darkDocument from "Assets/dark-download.png";
import darkThreeDot from "Assets/dark-three-dot.png";
import starBlack from "Assets/star-black.svg";
import axios from "axios";

toast.configure();


function SentMessages({ messagetype, payload,shouldBeRound }) {
debugger;
  const getDesiredTimeStamp = (timestamp) => {
    return new Date(timestamp).getHours() + ':' + new Date(timestamp).getMinutes()
  }

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(message,'dhruvin').toString(CryptoJS.enc.Utf8)
  }


  if (messagetype === "message" && shouldBeRound) {

    return (
        <div className='group-message self-sent'>
        <div className='group-message-image'></div>
        <div className='group-message-content self'>
              <div className='group-message-message self group-flex'>{getDecryptedMessage(payload.message)} <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
        </div>
    </div>
    );


  } else if (messagetype === "message" && !shouldBeRound) {


    return (
        <div className='group-message self-sent'>
        <div className='group-time-stamp'>{getDesiredTimeStamp(payload.timestamp)}</div>
        <div className='group-message-content self last-sent-message'>
              <div className='group-message-message self group-flex'>{getDecryptedMessage(payload.message)} <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
        </div>
    </div>
    );


  } else if (messagetype === "image" && shouldBeRound) {


    return (
        <div className='group-message self-sent'>
        <div className='group-time-stamp'>{getDesiredTimeStamp(payload.timestamp)}</div>
             <div className='group-image-content self last-sent-message'>
                 <div className='group-image-display'><img src={displayImage} alt=''></img></div>
                 <div className='group-image-desc self group-flex'>{getDecryptedMessage(payload.message)}<div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>    
             </div>
     </div> 
    );


  } else if (messagetype === "image" && !shouldBeRound) {


    return (
      <div className="single-image self-sent">
        <div className="single-img-timestamp">{new Date(payload.timestamp).getHours() + ':' + new Date(payload.timestamp).getMinutes()}</div>
        <div className="single-image-content self last-sent-message">
          <div className="single-image-display"><img src={payload.url} alt=""></img></div>
          <div className="single-image-desc self-image single-flex">{getDecryptedMessage(payload.message)}
            <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
          </div>
        </div>
      </div>
    );


  } else if (messagetype === "document") {


    return (
    
        <div className='group-message self-sent'>
        <div className='group-time-stamp'>{getDesiredTimeStamp(payload.timestamp)}</div>
             <div className='group-image-content self last-sent-message'>
                <div className='group-document-header align-end'>
                  <div className='three-dot-icon'><img src={darkThreeDot} alt=''></img></div>
                </div>
                <div className='group-document-content '>
                  <div className='download-document-icon'><img src={darkDocument} alt=''></img></div>
                  <div className='group-document-details'>
                     <div className='group-document-name self'>{payload.message.documentName}</div>
                     <div className='group-document-detail single-tick-document-sent group-flex'><div>{payload.message.documentSize} <span>{payload.message.documentExtention}</span></div> <div className='group-tick-icon'><img src={doubletick} alt=''></img></div></div>
                  </div>
                </div>  
             </div>
     </div> 
    );


  }
}

export default SentMessages;
