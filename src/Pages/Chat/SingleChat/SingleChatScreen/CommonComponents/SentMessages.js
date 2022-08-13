import React from "react";
import displayImage from "Assets/display-image.png";
import singletick from "Assets/single-tick.png";
import doubletick from "Assets/double-tick.png";
import doubletickread from "Assets/double-tick-read.png";
import darkDocument from "Assets/dark-download.png";
import darkThreeDot from "Assets/dark-three-dot.png";

function SentMessages({ messagetype, payload }) {
  if (messagetype === "normal-message") {


    return (
      <div className="single-message self-sent">
        <div className="single-message-content self single-flex">{payload}
          <div className="group-tick-icon">
            <img src={doubletick} alt=""></img>
          </div>
        </div>
      </div>
    );


  } else if (messagetype === "last-sent-message") {


    return (
      <div className="single-message self-sent">
        <div className="single-time-stamp">22:21</div>
        <div className="single-message-content self last-sent-message single-flex">{payload}
          <div className="group-tick-icon"><img src={doubletick} alt=""></img></div>
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


  } else if (messagetype === "last-sent-image") {


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


  } else if (messagetype === "last-sent-document") {


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
