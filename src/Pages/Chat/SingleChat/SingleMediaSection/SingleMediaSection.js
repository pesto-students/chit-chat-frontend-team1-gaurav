import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import smi1 from "Assets/single-media-i-1.png";
import spm1 from "Assets/single-pdf-media.png";
import starReveived from "Assets/star-received.svg";
import starSent from "Assets/star-sent.svg";
import "./SingleMediaSection.css";

function SingleMediaSection() {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECERET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });

  const state = useSelector((state) => state.SingleChatReducer);
  var { StaredMessages, imagesArray, documentsArray } = state;

  const [images, setImages] = useState({});

  useEffect(() => {}, []);

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

  const getImageFromKey = async (key, index) => {
    await myBucket.getObject(
      {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: key,
      },

      (err, data) => {
        if (err) setImages({ ...images, index: `` });

        setImages({
          ...images,
          index: `data:image/png;base64,${data.Body.toString("base64")}`,
        });
      }
    );
  };


  const downloadDocumentToLocal = (documenturl) => {
    let url = `https://chitchatcommunicationn.s3.ap-south-1.amazonaws.com/${encodeURIComponent(documenturl)}`;

    let link = document.createElement('a');
    link.href = url;
    link.click();
    
  }


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
          <div className="single-media-content">
            <div className="single-media-file">
              <div className="single-media-file-container">
                <img src={images["0"]} alt=""></img>
              </div>
            </div>
            <div className="single-media-file">
              <div className="single-media-file-container">
                <img src={images["1"]} alt=""></img>
              </div>
            </div>

            {imagesArray.length > 3 ? (
              <>
                <div className="single-media-file">
                  <div className="single-media-file-container single-media-info">
                    18+
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
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
                  <div className="single-file-icon" onClick={()=>downloadDocumentToLocal(document.key)}>
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
                      {new Date(message.timestamp).getHours()}:
                      {new Date(message.timestamp).getMinutes()}
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
                      {new Date(message.timestamp).getHours()}:
                      {new Date(message.timestamp).getMinutes()}
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
