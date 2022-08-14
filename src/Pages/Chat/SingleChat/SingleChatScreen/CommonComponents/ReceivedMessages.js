import React from "react";
import downloadDocument from "Assets/download-document.png";
import threeDot from "Assets/three-dot.png";
import displayImage from "Assets/display-image.png";

function ReceivedMessages({ messagetype, payload }) {
  if (messagetype === "normal-message") {


    return (
      <div className="single-message">
        <div className="single-message-content">{payload}</div>
      </div>
    );


  } else if (messagetype === "message") {


    return (
      <div className="single-message">
        <div className="single-message-content last-reveived-message">{payload}</div>
        <div className="single-time-stamp">22:21 </div>
      </div>
    );


  } else if (messagetype === "normal-image") {

    
    return (
      <div className="single-image">
        <div className="single-image-content">
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
