import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import smi1 from "Assets/single-media-i-1.png";
import spm1 from "Assets/single-pdf-media.png";
import starReveived from "Assets/star-received.svg";
import starSent from "Assets/star-sent.svg";
import "./SingleMediaSection.css";

function SingleMediaSection() {
  const state = useSelector((state) => state.SingleChatReducer);
  var { StaredMessages, imagesArray, documentsArray } = state;

  const [showAllImages, setShowAllImages] = useState(false);

  const getmonth = (month) => {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "July";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        break;
    }
  };

  const downloadDocumentToLocal = (documenturl) => {
    let url = `${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(documenturl)}`;
    let link = document.createElement("a");
    link.href = url;
    link.click();
  };

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(
      message,
      process.env.REACT_APP_MESSAGE_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
  };

  return (
    <>
      <div className="single-media-container">
        <div className="single-media-section">
          <div className="single-media-header">
            <div className="single-media-heading">
              <h2>Media</h2> <span>{imagesArray.length}</span>
            </div>
            <div className="single-media-see">
              {imagesArray.length > 3 ? "See All" : ""}
            </div>
          </div>
          {!showAllImages ? (
            <>
              <div className="single-media-content">
                {imagesArray.length > 0 && (
                  <div className="single-media-file">
                    <div className="single-media-file-container">
                      <img
                        src={`${
                          process.env.REACT_APP_AWS_BUCKET_PATH
                        }${encodeURIComponent(imagesArray[0].key)}`}
                        alt=""
                      ></img>
                    </div>
                  </div>
                )}
                {imagesArray.length > 1 && (
                  <div className="single-media-file">
                    <div className="single-media-file-container">
                      <img
                        src={`${
                          process.env.REACT_APP_AWS_BUCKET_PATH
                        }${encodeURIComponent(imagesArray[1].key)}`}
                        alt=""
                      ></img>
                    </div>
                  </div>
                )}

                {imagesArray.length > 2 ? (
                  <>
                    <div
                      className="single-media-file"
                      onClick={() => setShowAllImages(true)}
                    >
                      <div className="single-media-file-container single-media-info">
                        {imagesArray.length - 2}+
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <>
              <div
                className="single-media-content show-all-media"
                id="single-media-content"
              >
                {imagesArray.map((image) => {
                  return (
                    <>
                      <div className="single-media-file">
                        <div className="single-media-file-container">
                          <img
                            src={`${
                              process.env.REACT_APP_AWS_BUCKET_PATH
                            }${encodeURIComponent(image.key)}`}
                            alt=""
                          ></img>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="single-files-section">
          <div className="single-media-header fixed">
            <div className="single-media-heading">
              <h2>Files</h2> <span>{documentsArray.length}</span>
            </div>
            <div className="single-media-see">See All</div>
          </div>

          {documentsArray.map((document) => {
            return (
              <>
                <div className="single-files-container">
                  <div
                    className="single-file-icon"
                    onClick={() => downloadDocumentToLocal(document.key)}
                  >
                    <img src={spm1} alt=""></img>
                  </div>
                  <div className="single-file-details">
                    <div className="single-file-name">{document.name}</div>
                    <div className="single-file-detail">
                      {document.size}
                      <span>
                        {new Date(document.timestamp).getDate()}
                        {getmonth(new Date(document.timestamp).getMonth())}{" "}
                        {new Date(document.timestamp).getFullYear()}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className="single-star-section">
          <div className="single-media-header">
            <div className="single-media-heading">
              <h2>Stared Messages</h2>
            </div>
            <div className="single-media-see">See All</div>
          </div>

          {StaredMessages.map((message) => {
            if (message.type === "received") {
              return (
                <>
                  <div className="single-message width-90">
                    <div className="single-message-content last-reveived-message star-flex">
                      {getDecryptedMessage(message.message)}
                      <div className="single-star-received-icon">
                        <img src={starReveived} alt=""></img>
                      </div>{" "}
                    </div>
                  </div>
                  <div className="single-time-stamp single-media-star">
                    {new Date(message.timestamp).getDate()}
                    {getmonth(new Date(message.timestamp).getMonth())}{" "}
                    {new Date(message.timestamp).getFullYear()}{" "}
                    <span>
                      {(new Date(message.timestamp).getHours()) < 10 ? '0' : ''}{new Date(message.timestamp).getHours()}:
                      {(new Date(message.timestamp).getMinutes()) < 10 ? '0' : ''}{new Date(message.timestamp).getMinutes()}
                    </span>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="single-message self-sent-star width-90">
                    <div className="single-message-content self last-sent-message star-flex">
                      <div className="single-star-sent-icon">
                        <img src={starSent} alt=""></img>
                      </div>
                      {getDecryptedMessage(message.message)}
                    </div>
                  </div>
                  <div className="single-time-stamp self-sent-timestamp end">
                    {new Date(message.timestamp).getDate()}
                    {getmonth(new Date(message.timestamp).getMonth())}{" "}
                    {new Date(message.timestamp).getFullYear()}{" "}
                    <span>
                    {(new Date(message.timestamp).getHours()) < 10 ? '0' : ''}{new Date(message.timestamp).getHours()}:
                      {(new Date(message.timestamp).getMinutes()) < 10 ? '0' : ''}{new Date(message.timestamp).getMinutes()}
                    </span>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default SingleMediaSection;
