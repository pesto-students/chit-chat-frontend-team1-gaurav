/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import uparrow from "Assets/up-arrow.png";
import downarrow from "Assets/down-arrow.png";
import gmi1 from "Assets/group-message-image-1.png";
import spm1 from "Assets/single-pdf-media.png";
import starReveived from "Assets/star-received.svg";
import starSent from "Assets/star-sent.svg";
import { useSelector } from "react-redux";
import "./GroupMediaSection.css";

function GroupMediaSection() {


  const groupDetails = useSelector((state) => state.GroupChatReducer);
  const state = useSelector((state) => state.SingleChatReducer);

  const {
    receiverGroupDetails,
    StaredMessages,
    imagesArray,
    documentsArray,
    groupMembers,
  } = groupDetails;
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

    let onlineMembers = groupMembers.filter((groupMember) => {
      return onlineusersArray.includes(groupMember.userid);
    });

    setonlineMembers(onlineMembers);

    let oflineMembers = groupMembers.filter((groupMember) => {
      return !onlineusersArray.includes(groupMember.userid);
    });
    setoflineMembers(oflineMembers);
  });

  // for setting online and offline members list when there is change in socket
  useEffect(() => {
    let onlineusersArray = onlineUsers.map((item) => {
      return item.userid;
    });

    let onlineMembers = groupMembers.filter((groupMember) => {
      return onlineusersArray.includes(groupMember.userid);
    });

    setonlineMembers(onlineMembers);

    let oflineMembers = groupMembers.filter((groupMember) => {
      return !onlineusersArray.includes(groupMember.userid);
    });
    setoflineMembers(oflineMembers);
  }, [onlineUsers, groupMembers]);

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

  const getUserNameFromUserID = (userid) => {
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
    let url = `${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(
      documenturl
    )}`;
    let link = document.createElement("a");
    link.href = url;
    link.click();
  };

  const getProfileImg = (key) => {
    if (key === "" || key === undefined) {
      return gmi1;
    } else {
      return `${process.env.REACT_APP_AWS_BUCKET_PATH}${encodeURIComponent(
        key
      )}`;
    }
  };

  return (
    <>
      <div className="group-media-container">
        {/* Online/Offline Members Section */}
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
              Members{" "}
              <span>{receiverGroupDetails.groupmembersarray.length}</span>
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
                        <img
                          src={getProfileImg(member.profileImg)}
                          alt=""
                        ></img>
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
                        <img
                          src={getProfileImg(member.profileImg)}
                          alt=""
                        ></img>
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

        {/* images Section      */}
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
            <div className="group-image-cotainer">
              {imagesArray.map((image) => {
                return (
                  <>
                    <div className="group-media-file-container">
                      <img
                        src={`${
                          process.env.REACT_APP_AWS_BUCKET_PATH
                        }${encodeURIComponent(image.key)}`}
                        alt=""
                      ></img>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/* documents Section */}
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
                            {getUserNameFromUserID(message.senderid)}
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
                        {new Date(message.timestamp).getHours() < 10 ? "0" : ""}
                        {new Date(message.timestamp).getHours()}:
                        {new Date(message.timestamp).getMinutes() < 10
                          ? "0"
                          : ""}
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
                        {new Date(message.timestamp).getHours() < 10 ? "0" : ""}
                        {new Date(message.timestamp).getHours()}:
                        {new Date(message.timestamp).getMinutes() < 10
                          ? "0"
                          : ""}
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
