/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import AWS from "aws-sdk";
import uparrow from "Assets/up-arrow.png";
import downarrow from "Assets/down-arrow.png";
import gmi1 from "Assets/group-message-image-1.png";
import smi1 from "Assets/single-media-i-1.png";
import spm1 from "Assets/single-pdf-media.png";
import starReveived from "Assets/star-received.svg";
import starSent from "Assets/star-sent.svg";
import { useSelector } from "react-redux";
import "./GroupMediaSection.css";

function GroupMediaSection() {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECERET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });

  const groupDetails = useSelector((state) => state.GroupChatReducer);
  const state = useSelector((state) => state.SingleChatReducer);

  const { receiverGroupDetails, StaredMessages, imagesArray, documentsArray } =
    groupDetails;
  const { onlineUsers } = state;

  const [activeflags, setActiveFlags] = useState({
    members: true,
    media: false,
    files: false,
    star: false,
  });

  const [onlineMembers, setonlineMembers] = useState([]);
  const [oflineMembers, setoflineMembers] = useState([]);

  //for setting online and offline members list initially
  useEffect(() => {
    let onlineusersArray = onlineUsers.map((item) => {
      return item.userid;
    });

    let onlineMembers = receiverGroupDetails.groupmembersarray.filter(
      (groupMember) => {
        return onlineusersArray.includes(groupMember.userid);
      }
    );

    setonlineMembers(onlineMembers);

    let oflineMembers = receiverGroupDetails.groupmembersarray.filter(
      (groupMember) => {
        return !onlineusersArray.includes(groupMember.userid);
      }
    );

    setoflineMembers(oflineMembers);
  }, []);

  // for setting online and offline members list when there is change in socket
  useEffect(() => {
    let onlineusersArray = onlineUsers.map((item) => {
      return item.userid;
    });

    let onlineMembers = receiverGroupDetails.groupmembersarray.filter(
      (groupMember) => {
        return onlineusersArray.includes(groupMember.userid);
      }
    );

    setonlineMembers(onlineMembers);

    let oflineMembers = receiverGroupDetails.groupmembersarray.filter(
      (groupMember) => {
        return !onlineusersArray.includes(groupMember.userid);
      }
    );

    setoflineMembers(oflineMembers);
  }, [onlineUsers]);

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

  const getUserName = (userid) => {
    var username;
    receiverGroupDetails.groupmembersarray.map((member) => {
      if (member.userid === userid) username = member.username;
    });

    return username;
  };

  const getDecryptedMessage = (message) => {
    return CryptoJS.AES.decrypt(
      message,
      process.env.REACT_APP_MESSAGE_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
  };


  const downloadDocumentToLocal = (documenturl) => {
    let url = `https://chitchatcommunicationn.s3.ap-south-1.amazonaws.com/${encodeURIComponent(documenturl)}`;

    let link = document.createElement('a');
    link.href = url;
    link.click();
    
  }


  return (
    <>
      <div className="group-media-container">
        <div className="group-online-section">
          <button
            className="group-online-collipsible-button"
            onClick={() => {
              setActiveFlags({
                members: !activeflags.members,
                media: false,
                files: false,
                star: false,
              });
            }}
          >
            <div>
              Members <span>14</span>
            </div>
            <div className="group-collipsible-icon">
              <img
                src={!activeflags.members ? uparrow : downarrow}
                alt=""
              ></img>
            </div>
          </button>

          <div
            className={
              "online-collipsible-content " +
              (!activeflags.members ? "" : "show")
            }
          >
            <div className="online-members">Online-{onlineMembers.length}</div>
            <div className="online-list">
              {onlineMembers.map((member) => {
                return (
                  <>
                    <div className="online-member">
                      <div className="online-member-icon">
                        <img src={gmi1} alt=""></img>
                      </div>
                      <div className="online-member-name">
                        {member.username}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="online-members offline">
              Offline-{oflineMembers.length}
            </div>
            <div className="online-list">
              {oflineMembers.map((member) => {
                return (
                  <>
                    <div className="online-member">
                      <div className="online-member-icon">
                        <img src={gmi1} alt=""></img>
                      </div>
                      <div className="online-member-name offline">
                        {member.username}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        <div className="group-media-section">
          <button
            className="group-online-collipsible-button"
            onClick={() => {
              setActiveFlags({
                members: false,
                media: !activeflags.media,
                files: false,
                star: false,
              });
            }}
          >
            <div>
              Media <span>{imagesArray.length}</span>
            </div>
            <div className="group-collipsible-icon">
              <img src={!activeflags.media ? uparrow : downarrow} alt=""></img>
            </div>
          </button>

          <div
            className={
              "media-collipsible-content " + (!activeflags.media ? "" : "show")
            }
          >
            <div className="single-media-file">
              <div className="single-media-file-container">
                <img src={smi1} alt=""></img>
              </div>
            </div>

            <div className="single-media-file">
              <div className="single-media-file-container">
                <img src={smi1} alt=""></img>{" "}
              </div>
            </div>

            <div className="single-media-file">
              <div className="single-media-file-container single-media-info">
                18+
              </div>
            </div>
          </div>
        </div>

        <div className="group-files-section">
          <button
            className="group-online-collipsible-button"
            onClick={() => {
              setActiveFlags({
                members: false,
                media: false,
                files: !activeflags.files,
                star: false,
              });
            }}
          >
            <div>
              Files <span>{documentsArray.length}</span>
            </div>
            <div className="group-collipsible-icon">
              <img src={!activeflags.files ? uparrow : downarrow} alt=""></img>
            </div>
          </button>

          <div
            className={
              "files-collipsible-content " + (!activeflags.files ? "" : "show")
            }
          >
            {documentsArray.map((document) => {
              return (
                <>
                  <div className="single-files-container">
                    <div className="single-file-icon" onClick={() => downloadDocumentToLocal(document.key)}>
                      <img src={spm1} alt=""></img>
                    </div>
                    <div className="single-file-details">
                      <div className="single-file-name">{document.name}</div>
                      <div className="single-file-detail">
                        {document.size}
                        <span>
                          {new Date(document.timestamp).getDate()}
                          {getmonth(
                            new Date(document.timestamp).getMonth()
                          )}{" "}
                          {new Date(document.timestamp).getFullYear()}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        {/* StarSection   */}

        <div className="group-star-messages-section">
          <button
            className="group-online-collipsible-button"
            onClick={() => {
              setActiveFlags({
                members: false,
                media: false,
                files: false,
                star: !activeflags.star,
              });
            }}
          >
            <div>Star Messages</div>
            <div className="group-collipsible-icon">
              <img src={!activeflags.star ? uparrow : downarrow} alt=""></img>
            </div>
          </button>

          <div
            className={
              "files-collipsible-content " + (!activeflags.star ? "" : "show")
            }
          >
            {StaredMessages.map((message) => {
              if (message.type === "Received") {
                return (
                  <>
                    <div className="single-message ">
                      <div className="single-message-content last-reveived-message star-flex">
                        <div style={{ flexDirection: "column" }}>
                          <div className="group-message-name">
                            {getUserName(message.senderid)}
                          </div>
                          {getDecryptedMessage(message.message)}
                        </div>
                        <div className="single-star-received-icon">
                          <img src={starReveived} alt=""></img>
                        </div>
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
                    <div className="single-message self-sent-star">
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
      </div>
    </>
  );
}

export default GroupMediaSection;
